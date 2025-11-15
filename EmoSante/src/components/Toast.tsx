import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Animated, Text, StyleSheet, View, Dimensions } from 'react-native';

type ToastContextType = { show: (message: string) => void };
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const animation = useRef(new Animated.Value(0)).current;

  const show = (msg: string) => {
    setMessage(msg);
    Animated.sequence([
      Animated.timing(animation, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1400),
      Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => setMessage(''));
  };

  const translateY = animation.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message ? (
        <Animated.View pointerEvents="none" style={[styles.container, { transform: [{ translateY }], opacity: animation }]}>
          <View style={styles.toast}>
            <Text style={styles.text}>{message}</Text>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: Dimensions.get('window').width - 60,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

import React from 'react';
import { Pressable, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export type CalmButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'ghost' | 'pastel';
  disabled?: boolean;
  testID?: string;
};

export const CalmButton: React.FC<CalmButtonProps> = ({ title, onPress, variant = 'primary', disabled, testID }) => {
  // Common ripple config: transparent ripple and borderless to avoid
  // a rectangular highlight on Android while preserving feedback.
  const ripple = { color: 'rgba(0,0,0,0.06)', borderless: false };

  const content = (children: React.ReactNode) => (
    <LinearGradient
      colors={variant === 'primary' ? [colors.beige, colors.bgDark] : variant === 'pastel' ? [colors.lilac, colors.lilacDark] : ['transparent', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[variant === 'pastel' ? styles.pastelGradient : styles.gradient, variant === 'ghost' && styles.ghostGradient]}
    >
      {children}
    </LinearGradient>
  );

  return (
    <Pressable
      accessibilityRole="button"
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      android_ripple={ripple}
      style={({ pressed }) => [
        styles.base,
        variant === 'ghost' && styles.ghost,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {variant === 'pastel' ? (
        content(<Text style={styles.textPastel}>{title}</Text>)
      ) : (
        content(<Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textGhost]}>{title}</Text>)
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    marginVertical: 6,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  ghostGradient: {
    borderWidth: 1,
    borderColor: 'rgba(212, 196, 184, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  pastelGradient: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  textPrimary: {
    color: colors.text,
    fontWeight: '600',
  },
  textGhost: {
    color: colors.text,
  },
  textPastel: {
    color: colors.white,
    fontSize: 14,
    letterSpacing: 0.3,
    fontWeight: '600',
  },
});

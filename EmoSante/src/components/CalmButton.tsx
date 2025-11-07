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
  if (variant === 'pastel') {
    return (
      <Pressable
        accessibilityRole="button"
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <LinearGradient
          colors={[colors.lilac, colors.lilacDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pastelGradient}
        >
          <Text style={styles.textPastel}>{title}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'ghost' && styles.ghost,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={variant === 'primary' ? [colors.beige, colors.bgDark] : ['transparent', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, variant === 'ghost' && styles.ghostGradient]}
      >
        <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textGhost]}>{title}</Text>
      </LinearGradient>
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
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    fontSize: 16,
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
    fontSize: 16,
    letterSpacing: 0.3,
    fontWeight: '600',
  },
});

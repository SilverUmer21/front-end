import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';

export const SignInScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'SignIn'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" placeholderTextColor={colors.textMuted} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" placeholderTextColor={colors.textMuted} style={styles.input} secureTextEntry />
      <CalmButton title="Sign In" onPress={() => navigation.replace('Journal')} />
      <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
    </View>
  );
};

export const SignUpScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'SignUp'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" placeholderTextColor={colors.textMuted} style={styles.input} />
      <TextInput placeholder="Email" placeholderTextColor={colors.textMuted} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" placeholderTextColor={colors.textMuted} style={styles.input} secureTextEntry />
      <CalmButton title="Sign Up" onPress={() => navigation.replace('Journal')} />
      <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: colors.bg, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.bgLight,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    width: '100%',
  },
});

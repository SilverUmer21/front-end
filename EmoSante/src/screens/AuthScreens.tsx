import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, ActivityIndicator, Alert } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useToast } from '../components/Toast';
import { storage } from '../utils/storage';
// Authentication module disabled for now; navigation will go directly to Journal

export const SignInScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'SignIn'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignIn = async () => {
    // For now auth is bypassed; directly navigate to Journal
    setError('');
    setLoading(false);
    try {
      await storage.setItem('@demo_user', JSON.stringify({ email }));
    } catch (e) {
      // ignore storage errors for now
    }
    toast.show('Signed in (demo mode)');
    navigation.replace('Journal');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue your journey</Text>

      <View style={styles.form}>
        <TextInput 
          placeholder="Email" 
          placeholderTextColor={colors.textMuted} 
          style={styles.input} 
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          editable={!loading}
        />
        <TextInput 
          placeholder="Password" 
          placeholderTextColor={colors.textMuted} 
          style={styles.input} 
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          editable={!loading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.lilac} />
            <Text style={styles.loadingText}>Signing in...</Text>
          </View>
        ) : (
          <>
            <CalmButton title="Sign In" onPress={handleSignIn} disabled={!email || !password} />
            <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
          </>
        )}
      </View>
    </Animated.View>
  );
};

export const SignUpScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'SignUp'>> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = async () => {
    // For now bypass sign up and go to Journal
    setError('');
    setLoading(false);
    try {
      await storage.setItem('@demo_user', JSON.stringify({ name, email }));
    } catch (e) {
      // ignore storage errors
    }
    toast.show('Account created (demo mode)');
    navigation.replace('Journal');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Start your wellness journey today</Text>

      <View style={styles.form}>
        <TextInput 
          placeholder="Name" 
          placeholderTextColor={colors.textMuted} 
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError('');
          }}
          editable={!loading}
        />
        <TextInput 
          placeholder="Email" 
          placeholderTextColor={colors.textMuted} 
          style={styles.input} 
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          editable={!loading}
        />
        <TextInput 
          placeholder="Password (min 6 characters)" 
          placeholderTextColor={colors.textMuted} 
          style={styles.input} 
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          editable={!loading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.lilac} />
            <Text style={styles.loadingText}>Creating account...</Text>
          </View>
        ) : (
          <>
            <CalmButton 
              title="Sign Up" 
              onPress={handleSignUp} 
              disabled={!name || !email || !password}
            />
            <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
          </>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: colors.bg, 
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#fde8e8',
    padding: 10,
    borderRadius: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    color: colors.textMuted,
    fontSize: 16,
  },
});

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // In-memory users store for front-end-only auth (no AsyncStorage yet)
  const [users, setUsers] = useState<Array<any>>([]);

  // Load user session on app start
  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = async () => {
    try {
      // No persistent session for now. When AsyncStorage or backend is
      // available, restore session here. Current behavior keeps session
      // only in-memory during runtime for fast front-end testing.
    } catch (error) {
      console.error('Failed to load user session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validation
      if (!name.trim()) {
        return { success: false, error: 'Name is required' };
      }
      if (!email.trim() || !email.includes('@')) {
        return { success: false, error: 'Valid email is required' };
      }
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      // TODO: Uncomment when AsyncStorage is installed
      // const existingUsers = await AsyncStorage.getItem('@users');
      // const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      const userExists = users.find((u: any) => u.email === email);
      if (userExists) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };

  // Store in in-memory users list for now
  setUsers(prev => [...prev, { ...newUser, password }]);
  setUser(newUser);
  return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign up failed. Please try again.' };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validation
      if (!email.trim() || !email.includes('@')) {
        return { success: false, error: 'Valid email is required' };
      }
      if (!password) {
        return { success: false, error: 'Password is required' };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      // TODO: Uncomment when AsyncStorage is installed
      // const existingUsers = await AsyncStorage.getItem('@users');
      
      // Check credentials in-memory. If no match, create a temporary
      // session so front-end flows can be exercised without a backend.
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        const userData: User = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
        setUser(userData);
        return { success: true };
      }

      // Create lightweight temporary session for testing
      const tempUser: User = { id: Date.now().toString(), name: 'User', email };
      setUsers(prev => [...prev, { ...tempUser, password }]);
      setUser(tempUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Sign in failed. Please try again.' };
    }
  };

  const signOut = async () => {
    try {
      // Clear in-memory session (no persistent storage used for now)
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

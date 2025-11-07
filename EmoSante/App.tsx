import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { View } from 'react-native';
import { HomeScreen, RootStackParamList } from './src/screens/HomeScreen';
import { SignInScreen, SignUpScreen } from './src/screens/AuthScreens';
import { JournalScreen } from './src/screens/JournalScreen';
import { AddEntryScreen } from './src/screens/AddEntryScreen';
import { EntryDetailScreen } from './src/screens/EntryDetailScreen';
import { JournalProvider } from './src/context/JournalContext';
import { colors } from './src/theme/colors';

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
    notification: colors.primary,
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_600SemiBold, Lato_400Regular });
  if (!fontsLoaded) return <View />;

  return (
    <JournalProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Journal" component={JournalScreen} />
          <Stack.Screen name="AddEntry" component={AddEntryScreen} />
          <Stack.Screen name="EntryDetail" component={EntryDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
  );
}

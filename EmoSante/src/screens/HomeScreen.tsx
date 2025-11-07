import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type JournalEntry = { id: string; text: string };

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Journal: undefined;
  AddEntry: undefined;
  EntryDetail: { entryId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const scale = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 2400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.9, duration: 2400, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <LinearGradient colors={[colors.lilacLight, colors.bg]} style={styles.container}>
      <View style={styles.center}>
        <Animated.View style={[styles.tree, { transform: [{ scale }] }]}> 
          {/* Tree trunk */}
          <View style={styles.trunk} />
          
          {/* Tree leaves/foliage */}
          <View style={styles.foliage}>
            <View style={[styles.leaf, styles.leaf1]} />
            <View style={[styles.leaf, styles.leaf2]} />
            <View style={[styles.leaf, styles.leaf3]} />
            <View style={[styles.leaf, styles.leaf4]} />
            <View style={[styles.leaf, styles.leaf5]} />
          </View>
        </Animated.View>
        <Text style={styles.title}>EmoSante</Text>
        <Text style={styles.subtitle}>Journal • Breathe • Grow</Text>
        <View style={styles.buttons}>
          <CalmButton title="Sign Up" onPress={() => navigation.navigate('Journal')} testID="btn-signup" />
          <CalmButton title="Sign In" variant="ghost" onPress={() => navigation.navigate('SignIn')} testID="btn-signin" />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  tree: { 
    width: 140, 
    height: 160, 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginBottom: 24,
  },
  trunk: { 
    width: 12, 
    height: 80, 
    backgroundColor: colors.treeTrunk, 
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  foliage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  leaf: { 
    position: 'absolute', 
    width: 40, 
    height: 40, 
    backgroundColor: colors.treeLeaf, 
    borderRadius: 50,
    opacity: 0.9,
  },
  leaf1: { 
    top: 20, 
    left: 50, 
    width: 45, 
    height: 45,
  },
  leaf2: { 
    top: 15, 
    right: 50, 
    width: 42, 
    height: 42,
  },
  leaf3: { 
    top: 35, 
    left: 35, 
    width: 38, 
    height: 38,
  },
  leaf4: { 
    top: 40, 
    right: 35, 
    width: 40, 
    height: 40,
  },
  leaf5: { 
    top: 10, 
    left: 70, 
    width: 35, 
    height: 35,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: colors.text, 
    letterSpacing: 0.8,
  },
  subtitle: { 
    fontSize: 15, 
    color: colors.textMuted, 
    marginTop: 8,
    letterSpacing: 0.5,
  },
  buttons: { marginTop: 32, width: '100%' },
});

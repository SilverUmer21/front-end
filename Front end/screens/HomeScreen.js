import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ScrollView } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 2400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 2400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gradient} />
      <View style={styles.center}>
        <Animated.View style={[styles.tree, { transform: [{ scale }] }]}>
          <View style={styles.trunk} />
          <View style={styles.foliage}>
            <View style={[styles.leaf, styles.leaf1]} />
            <View style={[styles.leaf, styles.leaf2]} />
            <View style={[styles.leaf, styles.leaf3]} />
            <View style={[styles.leaf, styles.leaf4]} />
            <View style={[styles.leaf, styles.leaf5]} />
          </View>
        </Animated.View>
        <Text style={styles.title}>ÉmoSanté</Text>
        <Text style={styles.subtitle}>Journal • Breathe • Grow</Text>
        
        <View style={styles.buttons}>
          <CalmButton
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
          <CalmButton
            title="Sign In"
            variant="ghost"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.lilacLight,
    opacity: 0.3,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
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
  leaf1: { top: 20, left: 50, width: 45, height: 45 },
  leaf2: { top: 35, left: 20, width: 38, height: 38 },
  leaf3: { top: 35, right: 20, width: 38, height: 38 },
  leaf4: { top: 60, left: 35, width: 35, height: 35 },
  leaf5: { top: 60, right: 35, width: 35, height: 35 },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.lilacDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const Header: React.FC<{ title: string; right?: React.ReactNode }> = ({ title, right }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: colors.text,
  },
  right: { position: 'absolute', right: 16, top: 12 },
});

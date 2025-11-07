import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useJournal } from '../context/JournalContext';

export const JournalScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Journal'>> = ({ navigation }) => {
  const { entries } = useJournal();
  const [currentStreak] = useState(7); // Placeholder for streak calculation

  const openEntry = (entryId: string) => {
    navigation.navigate('EntryDetail', { entryId });
  };

  const generateReport = () => {
    Alert.alert(
      'Generate Report',
      `You have ${entries.length} entries in your journal. Report generation feature coming soon!`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Journal</Text>
      
      {/* Streak Card */}
      <View style={styles.streakCard}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <View style={styles.streakContent}>
          <Text style={styles.streakNumber}>{currentStreak} Days</Text>
          <Text style={styles.streakLabel}>Current Streak</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonHalf}>
            <CalmButton 
              title="✏️ Add Entry" 
              variant="pastel" 
              onPress={() => navigation.navigate('AddEntry')} 
            />
          </View>
          <View style={styles.buttonHalf}>
            <CalmButton 
              title="📊 Generate Report" 
              variant="ghost" 
              onPress={generateReport} 
            />
          </View>
        </View>
      </View>

      {/* Entry Count */}
      <Text style={styles.entryCount}>{entries.length} Entries</Text>

      {/* Entries List */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => openEntry(item.id)}>
            <View style={styles.card}>
              <Text style={styles.cardText} numberOfLines={2}>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.bg, 
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentPeach,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  streakEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  streakContent: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionButtons: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  entryCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 12,
  },
  list: { 
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 8,
  },
  cardText: { 
    color: colors.text, 
    fontSize: 16,
    lineHeight: 22,
  },
});

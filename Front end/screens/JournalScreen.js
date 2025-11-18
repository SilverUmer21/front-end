import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

const MOCK_ENTRIES = [
  { id: '1', text: 'Had a great day today!', emoji: '😊', date: '2025-11-16' },
  { id: '2', text: 'Feeling a bit tired but peaceful', emoji: '😌', date: '2025-11-15' },
  { id: '3', text: 'Overcome a big challenge', emoji: '😎', date: '2025-11-14' },
];

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState(MOCK_ENTRIES);

  const handleDeleteEntry = (id) => {
    Alert.alert('Delete Entry', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => setEntries(entries.filter((e) => e.id !== id)),
        style: 'destructive',
      },
    ]);
  };

  const renderEntry = ({ item }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => navigation.navigate('EntryDetail', { entryId: item.id })}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.entryInfo}>
          <Text style={styles.entryDate}>{item.date}</Text>
          <Text style={styles.entryPreview} numberOfLines={1}>
            {item.text}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteEntry(item.id)}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete" size={20} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Journal</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Logout', 'Are you sure?', [
              { text: 'Cancel', onPress: () => {}, style: 'cancel' },
              {
                text: 'Logout',
                onPress: () => navigation.navigate('Home'),
                style: 'destructive',
              },
            ]);
          }}
        >
          <MaterialIcons name="logout" size={24} color={colors.lilacDark} />
        </TouchableOpacity>
      </View>

      {entries.length > 0 ? (
        <FlatList
          data={entries}
          renderItem={renderEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="book" size={48} color={colors.lilac} />
          <Text style={styles.emptyText}>No entries yet</Text>
          <Text style={styles.emptySubtext}>Start journaling to track your emotions</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEntry')}
      >
        <MaterialIcons name="add" size={28} color={colors.beigeLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.lilacLight,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.lilacDark,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beigeLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.lilac,
  },
  entryHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  entryPreview: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.lilac,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.lilac,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

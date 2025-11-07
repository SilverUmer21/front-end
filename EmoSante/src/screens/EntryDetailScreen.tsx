import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useJournal } from '../context/JournalContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>;

export const EntryDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { entryId } = route.params;
  const { entries, deleteEntry, editEntry } = useJournal();
  const entry = entries.find(e => e.id === entryId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(entry?.text || '');

  if (!entry) {
    navigation.goBack();
    return null;
  }

  const handleSave = () => {
    editEntry(entry.id, text);
    setIsEditing(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Journal Entry</Text>
      
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          placeholder="Edit your entry..."
          placeholderTextColor={colors.textMuted}
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.entryText}>{entry.text}</Text>
        </View>
      )}

      <View style={styles.buttons}>
        {isEditing ? (
          <>
            <CalmButton title="Save Changes" variant="pastel" onPress={handleSave} />
            <CalmButton title="Cancel" variant="ghost" onPress={() => setIsEditing(false)} />
          </>
        ) : (
          <>
            <CalmButton title="Edit" variant="pastel" onPress={() => setIsEditing(true)} />
            <CalmButton title="Delete" variant="ghost" onPress={handleDelete} />
            <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 20,
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
    marginBottom: 20,
  },
  entryText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    backgroundColor: colors.bgLight,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 200,
    marginBottom: 20,
  },
  buttons: {
    gap: 10,
  },
});

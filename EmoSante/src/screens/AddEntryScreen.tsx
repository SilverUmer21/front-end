import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useJournal } from '../context/JournalContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEntry'>;

export const AddEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = useState('');
  const { addEntry } = useJournal();

  const handleSave = () => {
    if (!text.trim()) return;
    addEntry(text);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Entry</Text>
      <TextInput
        placeholder="Write your thoughts, feelings, or experiences..."
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={10}
        textAlignVertical="top"
      />
      <View style={styles.buttons}>
        <CalmButton title="Save" variant="pastel" onPress={handleSave} />
        <CalmButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 20,
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

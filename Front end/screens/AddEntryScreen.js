import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CalmButton } from '../components/CalmButton';
import { colors } from '../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddEntryScreen({ navigation }) {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('😊');

  const emojis = ['😊', '😢', '😡', '😴', '😌', '😨', '😍', '😎'];

  const handleSave = () => {
    if (!text.trim()) {
      Alert.alert('Validation', 'Please write an entry');
      return;
    }
    navigation.navigate('Journal');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.lilacDark} />
        </TouchableOpacity>
        <Text style={styles.title}>New Entry</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>How are you feeling?</Text>
        <View style={styles.emojiPicker}>
          {emojis.map((e) => (
            <TouchableOpacity
              key={e}
              style={[
                styles.emojiButton,
                emoji === e && styles.emojiButtonActive,
              ]}
              onPress={() => setEmoji(e)}
            >
              <Text style={styles.emojiText}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Write your thoughts</Text>
        <TextInput
          placeholder="Express yourself here..."
          placeholderTextColor={colors.textMuted}
          style={styles.textInput}
          multiline
          numberOfLines={8}
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <View style={styles.buttons}>
          <CalmButton
            title="Save Entry"
            onPress={handleSave}
          />
          <CalmButton
            title="Cancel"
            variant="ghost"
            onPress={() => navigation.goBack()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.lilacLight,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.lilacDark,
  },
  content: {
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 20,
  },
  emojiPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  emojiButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiButtonActive: {
    backgroundColor: colors.lilacLight,
    borderColor: colors.lilac,
  },
  emojiText: {
    fontSize: 28,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.beigeLight,
    color: colors.textPrimary,
    minHeight: 200,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
});

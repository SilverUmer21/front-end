import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { JournalEntry } from '../screens/HomeScreen';

type JournalContextType = {
  entries: JournalEntry[];
  addEntry: (text: string) => void;
  deleteEntry: (id: string) => void;
  editEntry: (id: string, text: string) => void;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: '1', text: 'Grateful for a calm morning ☕' },
    { id: '2', text: 'Walked in the park and breathed deeply 🌿' },
    { id: '3', text: 'Today I felt overwhelmed but took time to meditate 🧘' },
    { id: '4', text: 'Had a great conversation with a friend. Feeling connected 💙' },
    { id: '5', text: 'Reflecting on what brings me peace. Nature, music, quiet moments 🌅' },
  ]);

  const addEntry = (text: string) => {
    setEntries([{ id: Date.now().toString(), text }, ...entries]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const editEntry = (id: string, text: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, text } : e));
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, deleteEntry, editEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within JournalProvider');
  }
  return context;
};

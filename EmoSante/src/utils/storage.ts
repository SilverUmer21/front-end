let AsyncStorage: any = null;
try {
  // Dynamically require so app won't crash if not installed yet
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
}

const inMemoryStore: Record<string, string> = {};

export const storage = {
  async getItem(key: string) {
    if (AsyncStorage) return await AsyncStorage.getItem(key);
    return inMemoryStore[key] ?? null;
  },
  async setItem(key: string, value: string) {
    if (AsyncStorage) return await AsyncStorage.setItem(key, value);
    inMemoryStore[key] = value;
  },
  async removeItem(key: string) {
    if (AsyncStorage) return await AsyncStorage.removeItem(key);
    delete inMemoryStore[key];
  }
};

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const storage = {
  async set(key, value) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return SecureStore.setItemAsync(key, value);
  },

  async get(key) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async remove(key) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return SecureStore.deleteItemAsync(key);
  },
};

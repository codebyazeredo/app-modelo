import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'offcache:';

export async function cacheSet(key, value) {
  try {
    await AsyncStorage.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {}
}

export async function cacheGet(key) {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function cacheRemove(key) {
  try {
    await AsyncStorage.removeItem(PREFIX + key);
  } catch {}
}

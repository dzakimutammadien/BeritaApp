// File: lib/utils/saved.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BeritaItem } from '@/lib/api/berita';

const STORAGE_KEY = 'saved_berita';

export async function getSavedBerita(): Promise<BeritaItem[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveBerita(item: BeritaItem): Promise<void> {
  const existing = await getSavedBerita();
  const isExist = existing.some((i) => i.id === item.id);
  if (!isExist) {
    const updated = [...existing, item];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export async function removeBerita(id: number): Promise<void> {
  const existing = await getSavedBerita();
  const updated = existing.filter((i) => i.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function isBeritaSaved(id: number): Promise<boolean> {
  const existing = await getSavedBerita();
  return existing.some((i) => i.id === id);
}

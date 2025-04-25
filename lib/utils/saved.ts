// lib/utils/saved.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Berita } from '../api/berita';

const STORAGE_KEY = 'saved_news';

export async function getSavedNews(): Promise<Berita[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveNews(news: Berita): Promise<void> {
  const existing = await getSavedNews();
  const isExist = existing.find(item => item.url === news.url);
  if (!isExist) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, news]));
  }
}

export async function removeNews(newsUrl: string): Promise<void> {
  const existing = await getSavedNews();
  const filtered = existing.filter(item => item.url !== newsUrl);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function isNewsSaved(newsUrl: string): Promise<boolean> {
  const existing = await getSavedNews();
  return existing.some(item => item.url === newsUrl);
}

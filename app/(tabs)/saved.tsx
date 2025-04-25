import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getSavedNews, removeNews } from '../../lib/utils/saved';
import { Berita } from '../../lib/api/berita';
import BeritaCard from '../../components/BeritaCard';

export default function SavedScreen() {
  const [savedList, setSavedList] = useState<Berita[]>([]);

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const data = await getSavedNews();
    setSavedList(data);
  };

  const handleRemove = async (berita: Berita) => {
    await removeNews(berita.url);
    loadSaved();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Berita Tersimpan</Text>
      {savedList.length === 0 ? (
        <Text style={styles.empty}>Belum ada berita yang disimpan</Text>
      ) : (
        <FlatList
          data={savedList}
          keyExtractor={(item) => item.url}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <BeritaCard
              berita={item}
              isSaved={true}
              onSave={() => handleRemove(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
});

// File: app/(tabs)/saved.tsx
import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BeritaItem } from '@/lib/api/berita';
import { getSavedBerita } from '@/lib/utils/saved';
import BeritaCard from '@/components/BeritaCard';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedScreen() {
  const [savedBerita, setSavedBerita] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    const data = await getSavedBerita();
    setSavedBerita(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadSaved();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Berita Tersimpan</Text>

      {savedBerita.length === 0 && !loading ? (
        <Text style={styles.empty}>Belum ada berita tersimpan.</Text>
      ) : (
        <FlatList
          data={savedBerita}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BeritaCard berita={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999',
  },
});

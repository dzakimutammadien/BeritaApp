import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchBerita, Berita } from '../../lib/api/berita';
import BeritaCard from '../../components/BeritaCard';
import { saveNews, isNewsSaved } from '../../lib/utils/saved';

export default function HomeScreen() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [savedStatus, setSavedStatus] = useState<{ [url: string]: boolean }>({});

  useEffect(() => {
    loadBerita();
  }, []);

  async function loadBerita(query: string = '') {
    setLoading(true);
    const data = await fetchBerita(query);
    setBeritaList(data);
    updateSavedStatus(data);
    setLoading(false);
  }

  async function updateSavedStatus(data: Berita[]) {
    const statusObj: { [url: string]: boolean } = {};
    for (const berita of data) {
      statusObj[berita.url] = await isNewsSaved(berita.url);
    }
    setSavedStatus(statusObj);
  }

  const handleSearch = () => {
    loadBerita(search);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Berita Indonesia</Text>
      <TextInput
        placeholder="Cari berita..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={beritaList}
          keyExtractor={(item) => item.url}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <BeritaCard
              berita={item}
              isSaved={savedStatus[item.url]}
              onSave={async () => {
                await saveNews(item);
                updateSavedStatus(beritaList);
              }}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1c1c1c',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

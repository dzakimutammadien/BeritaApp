// File: app/(tabs)/index.tsx
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { fetchBerita, BeritaItem } from '@/lib/api/berita';
import BeritaCard from '@/components/BeritaCard';
import { kategoriList } from '@/lib/data/kategori';

export default function HomeScreen() {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [filteredBerita, setFilteredBerita] = useState<BeritaItem[]>([]);
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState<string>('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBerita();
      setBerita(data);
      setFilteredBerita(data);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = berita;

    if (kategori !== 'Semua') {
      filtered = filtered.filter(item => item.category === kategori);
    }
    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredBerita(filtered);
  }, [search, kategori, berita]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="green" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari berita..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchBox}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kategoriContainer}>
        {kategoriList.map(kat => (
          <Pressable
            key={kat}
            onPress={() => setKategori(kat)}
            style={[styles.kategoriButton, kategori === kat && styles.kategoriAktif]}
          >
            <Text style={[styles.kategoriText, kategori === kat && styles.kategoriTextAktif]}>
              {kat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {filteredBerita.length === 0 ? (
        <Text style={styles.noResultText}>Berita tidak ditemukan.</Text>
      ) : (
        <FlatList
          data={filteredBerita}
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
  searchBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  kategoriContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  kategoriButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
  },
  kategoriAktif: {
    backgroundColor: '#2ecc71',
  },
  kategoriText: {
    color: '#555',
  },
  kategoriTextAktif: {
    color: 'white',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

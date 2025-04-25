import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchBeritaById, BeritaItem } from '@/lib/api/berita';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [berita, setBerita] = useState<BeritaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetchBeritaById(Number(id));
        setBerita(data);
      } catch (error) {
        console.error('Gagal mengambil detail berita:', error);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!berita) {
    return (
      <View style={styles.center}>
        <Text>Berita tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{berita.title}</Text>
      <Text style={styles.body}>{berita.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  body: { fontSize: 16 },
});

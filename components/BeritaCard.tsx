// File: components/BeritaCard.tsx
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BeritaItem } from '@/lib/api/berita';
import { useRouter } from 'expo-router';
import { saveBerita, removeBerita, isBeritaSaved } from '@/lib/utils/saved';
import { Ionicons } from '@expo/vector-icons';

export default function BeritaCard({ berita }: { berita: BeritaItem }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      const isSaved = await isBeritaSaved(berita.id);
      setSaved(isSaved);
    };
    checkSaved();
  }, [berita.id]);

  const toggleSaved = async () => {
    if (saved) {
      await removeBerita(berita.id);
    } else {
      await saveBerita(berita);
    }
    setSaved(!saved);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/detail/[id]',
          params: {
            id: berita.id,
            data: JSON.stringify(berita),
          },
        })
      }
      style={styles.card}
    >
      <Image
        source={{
          uri: berita.image_url || 'https://via.placeholder.com/300x200?text=No+Image',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{berita.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{berita.category}</Text>
          <TouchableOpacity onPress={toggleSaved}>
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={24}
              color={saved ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: 'green',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

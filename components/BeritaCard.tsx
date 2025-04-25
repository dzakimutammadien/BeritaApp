import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Berita } from '../lib/api/berita';

interface Props {
  berita: Berita;
  onSave?: () => void;
  isSaved?: boolean;
}

const BeritaCard: React.FC<Props> = ({ berita, onSave, isSaved = false }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/detail/[id]',
      params: {
        id: encodeURIComponent(berita.url),
        title: berita.title, // opsional, bisa dibaca di detail
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      {berita.image && (
        <Image source={{ uri: berita.image }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{berita.title}</Text>
        <Text style={styles.desc} numberOfLines={3}>{berita.description}</Text>
        <View style={styles.bottom}>
          <Text style={styles.date}>
            {new Date(berita.published_at).toLocaleDateString()}
          </Text>
          {onSave && (
            <TouchableOpacity onPress={onSave}>
              <Text style={{ color: isSaved ? 'green' : '#007bff' }}>
                {isSaved ? '✓ Disimpan' : '+ Simpan'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    height: 180,
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  desc: {
    color: '#555',
    marginBottom: 8,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

export default BeritaCard;

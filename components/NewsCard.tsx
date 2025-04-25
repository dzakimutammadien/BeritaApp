import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

interface NewsCardProps {
  id: number;
  title: string;
  image: string;
  excerpt: string;
}

export default function NewsCard({ id, title, image, excerpt }: NewsCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.excerpt}>{excerpt}</Text>
        <Link href={`/detail/${id}`} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Baca Selengkapnya</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  excerpt: {
    fontSize: 14,
    color: '#475569',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#0284c7',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

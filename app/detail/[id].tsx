// File: app/detail/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';

export default function DetailScreen() {
  const { data } = useLocalSearchParams();
  const berita = data ? JSON.parse(data as string) : null;

  if (!berita) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Berita tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: berita.image_url || 'https://via.placeholder.com/300x200',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{berita.title}</Text>
      <Text style={styles.date}>{new Date(berita.pubDate).toLocaleString('id-ID')}</Text>
      <Text style={styles.body}>
        {berita.body || 'Tidak ada isi.'}
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(berita.link)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Baca Selengkapnya</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 16,
    color: 'gray',
  },
});

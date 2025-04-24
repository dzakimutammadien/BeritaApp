import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Ini Halaman Home</Text>
      <Link href="/detail/[id]" asChild>
        <Button title="Lihat Detail Berita" />
      </Link>
    </View>
  );
}

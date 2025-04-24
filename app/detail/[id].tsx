import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailBerita() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Detail Berita untuk ID: {id}</Text>
    </View>
  );
}

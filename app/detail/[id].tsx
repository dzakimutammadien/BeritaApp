import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DetailScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  if (!url) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>URL berita tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.headerTitle}>{title || 'Detail Berita'}</Text>
      </View>
      <WebView source={{ uri: url }} startInLoadingState />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'green',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

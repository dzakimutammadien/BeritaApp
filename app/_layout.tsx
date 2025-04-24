 HEAD
HEAD
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';

 534b008 (Initial commit: setup BeritaApp with expo-router and base layout)
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
 HEAD
  const colorScheme = useColorScheme();
b94f8bd (Perbaiki README.md)

 534b008 (Initial commit: setup BeritaApp with expo-router and base layout)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
 HEAD
 HEAD
    <>
      <Stack />
      <StatusBar style="auto" />
    </>

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
 b94f8bd (Perbaiki README.md)

    <>
      <Stack />
      <StatusBar style="auto" />
    </>
 534b008 (Initial commit: setup BeritaApp with expo-router and base layout)
  );
}

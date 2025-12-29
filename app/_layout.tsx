import { Stack } from 'expo-router';
import { WeatherProvider } from './_WeatherContext';
import { SettingsProvider } from './_SettingsContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <WeatherProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </WeatherProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
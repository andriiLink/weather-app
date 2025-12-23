import { Stack } from 'expo-router';
import { WeatherProvider } from './WeatherContext';

export default function Layout() {
  return (
    <WeatherProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherProvider>
  );
}
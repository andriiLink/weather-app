import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from "expo-router";
import { ImageBackground, StyleSheet } from 'react-native';

import { getWeatherInterpretation } from '../../src/utils/weatherInterpretation';
import useWeatherContext from '../../src/hooks/useWeatherContext';

export default function TabsLayout() {
  const { weatherData } = useWeatherContext();
  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1
  );

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,

        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,

        tabBarBackground: () => (
          <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill} />
        ),

        tabBarIcon: ({ focused }) => (
          <ImageBackground style={styles.focusedScreen}></ImageBackground>
        )
      }}
    >
      <Tabs.Screen
        name="otherDaysWeather"
        options={{
          title: 'Тиждень',
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name='calendar-range'
              color={color}
              size={size}
            />,
        }}
      />


      <Tabs.Screen
        name="index"
        options={{
          title: 'Сьогодні',
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name={currentWeather.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              color={color}
              size={size}
            />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Налаштування',
          tabBarIcon: ({ color, size }) =>
            <MaterialCommunityIcons
              name="cog"
              color={color}
              size={size}
            />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 10,
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },

  focusedScreen: {
    height: 22,
    width: 3,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

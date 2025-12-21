import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { useWeather, useUserLocation } from '../src/hooks/index';
import { getWeatherInterpretation } from '../src/utils/weatherInterpretation';
import { DetailItem } from '../src/components/DetailItem';

export default function Page() {
  const {
    coordinates,
    errorMsg: locationErrorMsg,
    loading: locationLoading,
  } = useUserLocation();

  const { weatherData,
    errorMsg: weatherErrorMsg,
    loading: weatherLoading,
  } = useWeather(coordinates?.latitude ?? null, coordinates?.longitude ?? null);

  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1
  );

  if (locationLoading || weatherLoading) {
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );
  };

  if (locationErrorMsg || weatherErrorMsg) {
    console.log(locationErrorMsg, 'index error');

    return (
      <View>
        <Text>ERROR!!!</Text>
        <Text>Please, reload your App</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={currentWeather.gradient} style={styles.container}>
        <View style={styles.mainInfo}>
          <MaterialCommunityIcons name={currentWeather.icon as any} size={25} color="white" />
          <View style={styles.textWrapper}>
            <Text style={styles.tempText}>{Math.round(weatherData?.current.temperature_2m ?? 0)}°C</Text>
            <Text style={styles.conditionText}>{currentWeather.label}</Text>
          </View>
        </View>
        <View style={styles.glassCardWrapper}>
          <LinearGradient
            colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.borderWrapper}
          >
            <BlurView 
              intensity={30} 
              tint="light" 
              style={[
                styles.glassCard,
                {shadowColor: weatherData?.current.is_day === 0 ? "#000" : "#fff",}
              ]}
            >
              <View style={styles.reflection} />
              <View>
                <DetailItem
                  label="Вологість"
                  value={`${weatherData?.current.relative_humidity_2m}%`}
                  icon="water-percent"
                />
                <DetailItem
                  label="Вітер"
                  value={`${weatherData?.current.wind_speed_10m} км/год`}
                  icon="weather-windy"
                />
              </View>
            </BlurView>
          </LinearGradient>
        </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },

  mainInfo: {
    alignItems: "center",
    marginTop: 40,
  },

  textWrapper: {
    alignItems: 'center',
  },

  tempText: {
    fontSize: 100,
    fontWeight: 200,
    color: "white",
  },

  conditionText: {
    fontSize: 24,
    color: "white",
    opacity: 0.8,
    textTransform: 'capitalize',
  },

  glassCardWrapper: {
    marginHorizontal: 20,
    marginTop: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  borderWrapper: {
    padding: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },

  glassCard: {
    borderRadius: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',

    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',

    borderTopWidth: 1.5,
    borderLeftWidth: 1.2,

    overflow: 'hidden',

    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  reflection: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 200,
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ rotate: '45deg' }],
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from "react-native";

import { DetailItem } from '../../src/components/DetailItem';
import { getWeatherInterpretation } from '../../src/utils/weatherInterpretation';
import { useWeatherContext } from '../../src/hooks/useWeatherContext';
import useSettings from '@/src/hooks/useSettings';
import { TemperatureMeasures } from '@/src/types/settingsContextType';

export default function Page() {
  const { weatherData, loading, errorMsg } = useWeatherContext();
  const {
    language,
    windSpeed,
    humidity,
    temperatureMeasure,
  } = useSettings();

  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1
  );

  const humidityOrWindSpeedOn = humidity || windSpeed;

  if (loading) {
    return (
      <LinearGradient
        colors={currentWeather.gradient}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.mainInfo}>LOADING...</Text>
        </View>
      </LinearGradient>
    );
  };

  if (errorMsg) {
    return (
      <LinearGradient
        colors={currentWeather.gradient}
        style={styles.container}
      >
        <View>
          <Text style={styles.mainInfo}>ERROR!!!</Text>
          <Text style={styles.mainInfo}>Please, reload your App</Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <LinearGradient colors={currentWeather.gradient} style={styles.container}>
      <View style={styles.mainInfo}>
        <MaterialCommunityIcons name={currentWeather.icon as any} size={25} color="white" />
        <View style={styles.textWrapper}>
          {temperatureMeasure === TemperatureMeasures.Celsius ? (
            <Text style={styles.tempText}>
              {Math.round(weatherData?.current.temperature_2m ?? 0)}°C
            </Text>
          ) : (
            temperatureMeasure === TemperatureMeasures.Fahrenheit ? (
              <Text style={styles.tempText}>
                {((Math.round(weatherData?.current.temperature_2m ?? 0)) * 1.8) + 32}°F
              </Text>
            ) : (
              <Text style={styles.tempText}>
                {(Math.round(weatherData?.current.temperature_2m ?? 0) + 273.15)}K
              </Text>
            )
          )}
          <Text style={styles.conditionText}>{currentWeather.label}</Text>
        </View>
      </View>
      {humidityOrWindSpeedOn && (
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
                { shadowColor: weatherData?.current.is_day === 0 ? "#000" : "#fff", }
              ]}
            >
              <View style={styles.reflection} />
              <View>
                {humidity && (
                  <DetailItem
                    label="Вологість"
                    value={`${weatherData?.current.relative_humidity_2m}%`}
                    icon="water-percent"
                  />
                )}

                {windSpeed && (
                  <DetailItem
                    label="Вітер"
                    value={`${weatherData?.current.wind_speed_10m} км/год`}
                    icon="weather-windy"
                  />
                )}
              </View>
            </BlurView>

          </LinearGradient>
        </View>
      )}
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

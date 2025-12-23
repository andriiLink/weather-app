import { View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useWeatherContext from '../WeatherContext';
import { getWeatherInterpretation } from '@/src/utils/weatherInterpretation';

const Settings = () => {
  const { weatherData } = useWeatherContext();
  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1
  );

  return (
    <LinearGradient
      colors={currentWeather.gradient}
      style={styles.container}
    >
      <View>
        <Text>Settings</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Settings;
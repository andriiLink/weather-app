import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { DetailItem } from '@/src/components/DetailItem';
import { BlurView } from 'expo-blur';
import { getWeatherInterpretation } from '../../src/utils/weatherInterpretation';
import { useWeatherContext } from '../../src/hooks/useWeatherContext';
import { useTranslation } from 'react-i18next';

const OtherDaysWeather = () => {
  const { t } = useTranslation();
  const { weatherData } = useWeatherContext();
  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1,
  );

  const forecastArray = weatherData?.daily.time.map((date, index) => {
    return {
      date: date,
      maxTemp: weatherData.daily.temperature_2m_max[index],
      minTemp: weatherData.daily.temperature_2m_min[index],
      weatherCode: getWeatherInterpretation(
        weatherData.daily.weather_code[index] ?? 0,
        weatherData.current.is_day ?? 1,
      ),
    };
  });

  const chartData = weatherData?.daily.temperature_2m_max.map((temp, index) => ({
    value: Math.round(temp),
    label: weatherData.daily.time[index].split('-')[2],
  })) || [];

  return (
    <LinearGradient
      colors={currentWeather.gradient}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>{t('weather.temp_forecast')}</Text>

        <LineChart
          data={chartData}
          height={150}
          thickness={3}
          color="#fff"
          hideRules
          hideYAxisText
          yAxisColor="transparent"
          xAxisColor="transparent"
          areaChart

          showValuesAsDataPointsText
          textColor="white"
          textFontSize={20}
          textShiftY={-10}
          textShiftX={-5}
          startFillColor="rgba(255, 255, 255, 0.3)"
          endFillColor="transparent"
          curved
          dataPointsColor="#fff"
        />
      </View>

      <ScrollView>
        {forecastArray?.map((day) => {
          return (
            <View key={day.date} style={styles.glassCardWrapper}>
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
                    <Text style={styles.dateText}>{day.date}</Text>
                  </View>

                  <View style={styles.weekTextsPositions}>
                    <DetailItem
                      label={t('weather.temperature')}
                      value={
                        `${Math.round(day.minTemp)} - ${Math.round(day.maxTemp)} °C`
                      }
                      icon="thermometer"
                    />
                    <View style={styles.weatherInfoWrapper}>
                      <MaterialCommunityIcons
                        name={day.weatherCode.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                        size={26} color="#fff" />
                      <Text style={styles.wetherLabel}>{t(day.weatherCode.label)}</Text>
                    </View>
                  </View>
                </BlurView>
              </LinearGradient>
            </View>
          );
        })}
        <View style={styles.normalizeList}></View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    top: 40,
    left: 10,
    color: '#fff',
    fontSize: 30,
    fontWeight: 500,
  },

  glassCardWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
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

  weekTextsPositions: {
    flexDirection: 'row',
  },

  dateText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 20,
    fontWeight: 500,
  },

  weatherInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
  },

  wetherLabel: {
    width: 100,
    marginLeft: 15,
    color: '#fff',
    fontSize: 15,
    fontWeight: 200,
    flexWrap: 'wrap',
  },

  normalizeList: {
    height: 150,
  },
});

export default OtherDaysWeather;

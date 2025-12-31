import { useState } from 'react';
import { getWeatherInterpretation } from '@/src/utils/weatherInterpretation';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Checkbox from 'expo-checkbox'
import { useTranslation } from 'react-i18next';

import useWeatherContext from '../../src/hooks/useWeatherContext';
import useSettings from '../../src/hooks/useSettings';
import { Languages, TemperatureMeasureType, TemperatureMeasures } from '@/src/types/settingsContextType';

const Settings = () => {
  const { t } = useTranslation();
  const [
    languageModalVisibility,
    setLanguageModalVisibility
  ] = useState(false);
  const { weatherData } = useWeatherContext();
  const currentWeather = getWeatherInterpretation(
    weatherData?.current.weather_code ?? 0,
    weatherData?.current.is_day ?? 1
  );

  const {
    language,
    windSpeed,
    humidity,
    temperatureMeasure,

    handleChangeLanguage,
    handleToggleWindSpeed,
    handleToggleHumidity,
    handleChangeTemperature,
  } = useSettings();

  const measureToIndex = {
    [TemperatureMeasures.Celsius]: 0,
    [TemperatureMeasures.Fahrenheit]: 1,
    [TemperatureMeasures.Kelvin]: 2,
  };

  const indexToMeasure: TemperatureMeasureType[] = [
    TemperatureMeasures.Celsius,
    TemperatureMeasures.Fahrenheit,
    TemperatureMeasures.Kelvin,
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#666' }}>
      <LinearGradient
        colors={currentWeather.gradient}
        style={styles.container}
      >
        <View>
          <Text style={[styles.mainText, { color: currentWeather.textColor }]}>
            {t('common.settings')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setLanguageModalVisibility(true)}
          style={styles.languageWrapper}>
          <BlurView style={[
            styles.glassCard,
            { shadowColor: weatherData?.current.is_day === 0 ? "#000" : "#fff", }
          ]}>
            <View style={styles.languageContent}>
              <Text style={[styles.languageText, { color: currentWeather.textColor }]}>
                {t('settings.language')}:
              </Text>
              {language === Languages.UA ? (
                <Image source={require('../../assets/images/langUa.png')} style={styles.flagImg} />
              ) : (
                <Image source={require('../../assets/images/langEn.png')} style={styles.flagImg} />
              )}
            </View>
          </BlurView>
        </TouchableOpacity>

        <Modal
          visible={languageModalVisibility}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setLanguageModalVisibility(false)}
        >
          <TouchableOpacity
            onPress={() => setLanguageModalVisibility(false)}
            style={styles.modalOverlay}
          >
            <View style={styles.modalWindow}>
              <BlurView style={[
                styles.glassCard,
                { shadowColor: weatherData?.current.is_day === 0 ? "#000" : "#fff", }
              ]}>
                <Text style={[styles.mainText, { color: currentWeather.textColor }]}>
                  {t('settings.select_language')}:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleChangeLanguage(Languages.UA);
                    setLanguageModalVisibility(false);
                  }}
                  style={styles.languageSelectorModalWrapper}
                >
                  <Text style={styles.languageText}>Українська мова</Text>
                  <Image source={require('../../assets/images/langUa.png')} style={styles.flagImg} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleChangeLanguage(Languages.EN);
                    setLanguageModalVisibility(false);
                  }}
                  style={styles.languageSelectorModalWrapper}
                >
                  <Text style={styles.languageText}>English</Text>
                  <Image source={require('../../assets/images/langEn.png')} style={styles.flagImg} />
                </TouchableOpacity>
              </BlurView>
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.optionsWrapper}>
          <BlurView style={styles.glassCard}>
            <Text style={[styles.optionsToShowText, { color: currentWeather.textColor }]}>
              {t('settings.display_params')}:
            </Text>

            <View style={styles.windSpeedWrapper}>
              <Text style={[styles.optionsText, { color: currentWeather.textColor }]}>
                {t('settings.wind_speed')}:
              </Text>
              <Checkbox
                value={windSpeed}
                onValueChange={handleToggleWindSpeed}
                color={windSpeed ? 'rgba(255, 255, 255, 0.8)' : undefined}
                style={styles.checkbox}
              />
            </View>

            <View style={styles.humidityWrapper}>
              <Text style={[styles.optionsText, { color: currentWeather.textColor }]}>
                {t('common.humidity')}:
              </Text>
              <Checkbox
                value={humidity}
                onValueChange={handleToggleHumidity}
                color={humidity ? 'rgba(255, 255, 255, 0.8)' : undefined}
                style={styles.checkbox}
              />
            </View>

            <Text style={[styles.optionsText, { color: currentWeather.textColor }]}>
              {t('settings.temp_format')}:
            </Text>
            <SegmentedControl
              values={['°C', '°F', 'K']}
              selectedIndex={measureToIndex[temperatureMeasure as keyof typeof measureToIndex]}
              onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                handleChangeTemperature(indexToMeasure[index])
              }}
              appearance='light'
              style={styles.tempMeasureRadio}
            >

            </SegmentedControl>
          </BlurView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalWindow: {
    width: '80%',
    height: '40%',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  languageSelectorModalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 30,
  },

  mainText: {
    top: 10,
    left: 20,

    fontSize: 27,
    fontWeight: 600,
  },

  languageWrapper: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,

    overflow: 'hidden',

    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  languageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  languageText: {
    top: 7,

    color: '#fff',
    fontSize: 18,
    fontWeight: 600,
  },

  flagImg: {
    width: 55,
    height: 40,
  },

  optionsWrapper: {
    flex: 5,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 120,

    overflow: 'hidden',

    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  optionsToShowText: {
    top: 6,

    fontSize: 18,
    fontWeight: 600,

    marginBottom: 30,
  },

  optionsText: {
    top: 6,
    left: 20,

    fontSize: 18,
    fontWeight: 600,

    marginBottom: 10,
  },

  windSpeedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 30,
  },

  humidityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 30,
  },

  checkbox: {
    height: 30,
    width: 30,

    right: 15,
  },

  tempMeasureRadio: {
    marginTop: 10,
    height: 50,

    overflow: 'hidden',

    fontWeight: 700,

    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  glassCard: {
    flex: 1,
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
});

export default Settings;

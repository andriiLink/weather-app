import { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SettingsType,
  LanguageType,
  Languages,
  TemperatureMeasureType,
  TemperatureMeasures
} from '../src/types/settingsContextType';
import { Alert } from 'react-native';
import i18n from '@/src/utils/i18n';

export const SettingsContext = createContext<SettingsType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>(Languages.UA);
  const [windSpeed, setWindSpeed] = useState(true);
  const [humidity, setHumidity] = useState(true);
  const [
    temperatureMeasure,
    setTemperatureMeasure
  ] = useState<TemperatureMeasureType>(TemperatureMeasures.Celsius);

  const STORAGE_KEY = '@weather_settings'

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await AsyncStorage.getItem(STORAGE_KEY);

        if (loadedSettings !== null) {
          const parsedSettings = JSON.parse(loadedSettings);

          if (parsedSettings.language) {
            setLanguage(parsedSettings.language);
          }
          if (parsedSettings.windSpeed) {
            setWindSpeed(parsedSettings.windSpeed);
          }
          setHumidity(parsedSettings.humidity ?? true);
          setTemperatureMeasure(parsedSettings.temperatureMeasure ?? true);

          i18n.changeLanguage(parsedSettings.language);
        }
      } catch (error: any) {
        Alert.alert('Unable to load settings', error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        i18n.changeLanguage(language);

        const settingsToSave = {
          language,
          windSpeed,
          humidity,
          temperatureMeasure
        };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settingsToSave))
      } catch (error: any) {
        Alert.alert('Unable to save settings', error)
      }
    };

    saveSettings();
  }, [language, windSpeed, humidity, temperatureMeasure]);

  const handleChangeLanguage = (curr: LanguageType) => {
    setLanguage(curr);
    if (curr === Languages.EN) {
      setTemperatureMeasure(TemperatureMeasures.Fahrenheit)
    }
  };
  const handleToggleWindSpeed = () => setWindSpeed(prev => !prev);
  const handleToggleHumidity = () => setHumidity(prev => !prev);
  const handleChangeTemperature = (curr: TemperatureMeasureType) => setTemperatureMeasure(curr);

  const value = {
    language,
    windSpeed,
    humidity,
    temperatureMeasure,
    handleChangeLanguage,
    handleToggleWindSpeed,
    handleToggleHumidity,
    handleChangeTemperature,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

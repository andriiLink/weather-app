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

// creating context itself
export const SettingsContext = createContext<SettingsType | undefined>(undefined);

// creating provider for our context 
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  // states for our settings
  const [language, setLanguage] = useState<LanguageType>(Languages.UA);
  const [windSpeed, setWindSpeed] = useState(true);
  const [humidity, setHumidity] = useState(true);
  const [
    temperatureMeasure,
    setTemperatureMeasure
  ] = useState<TemperatureMeasureType>(TemperatureMeasures.Celsius);

  // storage key we can access saved settings
  const STORAGE_KEY = '@weather_settings'

  // useEffect for loading settings from local storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // extract settings info from storage
        const loadedSettings = await AsyncStorage.getItem(STORAGE_KEY);

        if (loadedSettings !== null) {
          const parsedSettings = JSON.parse(loadedSettings);

          // setting loaded settings in states
          if (parsedSettings.language) {
            setLanguage(parsedSettings.language);
          }
          if (parsedSettings.windSpeed) {
            setWindSpeed(parsedSettings.windSpeed);
          }
          setHumidity(parsedSettings.humidity ?? true);
          setTemperatureMeasure(parsedSettings.temperatureMeasure ?? true);

          // call languageChange function
          i18n.changeLanguage(parsedSettings.language);
        }
      } catch (error: any) {
        Alert.alert('Unable to load settings', error);
      }
    };

    loadSettings();
  }, []);

  // useEffect for saving settings in local storage
  useEffect(() => {
    const saveSettings = async () => {
      try {
        // updating language when value 'language' changes
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

  // functions to word with values
  const handleChangeLanguage = (curr: LanguageType) => {
    setLanguage(curr);
    if (curr === Languages.EN) {
      setTemperatureMeasure(TemperatureMeasures.Fahrenheit)
    }
  };
  const handleToggleWindSpeed = () => setWindSpeed(prev => !prev);
  const handleToggleHumidity = () => setHumidity(prev => !prev);
  const handleChangeTemperature = (curr: TemperatureMeasureType) => setTemperatureMeasure(curr);

  // object we will set as a props in our provider 
  // vars and funcs will be accessable when we call context
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

  // tabs we return with children tag tree inside it
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

import { useState, createContext } from 'react';
// import {  } from '@react-native-async-storage/async-storage';

import { 
  SettingsType,
  LanguageType,
  Languages,
  TemperatureMeasureType,
  TemperatureMeasures
} from '../src/types/settingsContextType';

// creating context itself
export const SettingsContext = createContext<SettingsType | undefined>(undefined);

// creating provider for our context 
export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  // states for our settings
  const [language, setLanguage] = useState<LanguageType>(Languages.UA);
  const [windSpeed, setWindSpeed] = useState(true);
  const [humidity, setHumidity] = useState(true);
  const [
    temperatureMeasure,
    setTemperatureMeasure
  ] = useState<TemperatureMeasureType>(TemperatureMeasures.Celsius);

  // functions to word with values
  const handleChangeLanguage = (curr: LanguageType) => {
    setLanguage(curr);
    if (curr === Languages.EN) {
      setTemperatureMeasure(TemperatureMeasures.Fahrenheit)
    }
  }; 
  const handleToggleWindSpeed = () => setWindSpeed(prev => !prev); 
  const handleToggleHumidity = () => setHumidity(prev => !prev); 
  const handleChangeTemperature = (curr: TemperatureMeasureType) => setTemperatureMeasure(curr) ; 

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

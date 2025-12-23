import { useState, createContext, useContext, ReactNode} from 'react';
import { useWeather, useUserLocation } from '../src/hooks/index';
import { getWeatherInterpretation } from '../src/utils/weatherInterpretation';
import { WeatherContextType } from '@/src/types/weather';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider = ({ children }: {children: React.ReactNode}) => {
  const {
    coordinates,
    errorMsg: locationErrorMsg,
    loading: locationLoading,
  } = useUserLocation();  

  const { 
    weatherData,
    errorMsg: weatherErrorMsg,
    loading: weatherLoading,
  } = useWeather(coordinates?.latitude ?? null, coordinates?.longitude ?? null);

  const weatherFullInfo = {
    weatherData,
    loading: locationLoading || weatherLoading,
    errorMsg: locationErrorMsg || weatherErrorMsg,
  }

  return (
    <WeatherContext.Provider value={weatherFullInfo}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('Unable to handle weather data!');
  }

  return context;
};

export default useWeatherContext;

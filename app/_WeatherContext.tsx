import { createContext } from 'react';
import { useWeather, useUserLocation } from '../src/hooks/index';
import { WeatherContextType } from '@/src/types/weather';

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

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

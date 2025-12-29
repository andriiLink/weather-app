import { createContext } from 'react';
import { useWeather, useUserLocation } from '../src/hooks/index';
import { WeatherContextType } from '@/src/types/weather';

// creating context itself
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

// creating provider for our context 
export const WeatherProvider = ({ children }: {children: React.ReactNode}) => {
  // getting user's coodrdinates to make fetch on API
  const {
    coordinates,
    errorMsg: locationErrorMsg,
    loading: locationLoading,
  } = useUserLocation();  

  // getting information about weather
  const { 
    weatherData,
    errorMsg: weatherErrorMsg,
    loading: weatherLoading,
  } = useWeather(coordinates?.latitude ?? null, coordinates?.longitude ?? null);

  // creating a value we'll put inside the provider
  const weatherFullInfo = {
    weatherData,
    loading: locationLoading || weatherLoading,
    errorMsg: locationErrorMsg || weatherErrorMsg,
  }

  // tabs we return with children tag tree inside it
  return (
    <WeatherContext.Provider value={weatherFullInfo}>
      {children}
    </WeatherContext.Provider>
  );
};

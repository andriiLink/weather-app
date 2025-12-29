import { useEffect, useState } from 'react';

import { WeatherAPI } from '../servises/api';
import { WeatherDataType } from '../types/weather';

// logic for getting info about weather
export const useWeather = (latitude: number | null, longitude: number | null) => {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWeatherDataFromAPI = async () => {
      try {
        //checking if we already get location
        if (latitude === null || longitude === null) {
          return;
        }
        
        // call fetch from services and getting response
        let weatherDataFromAPI = await WeatherAPI.getData(latitude, longitude);

        // checking if call was successful
        if (!weatherDataFromAPI) {
          setErrorMsg('Something wrong with connection');

          return;
        }

        // setting data in json format
        setWeatherData(weatherDataFromAPI);
      } catch (error) {
        setErrorMsg('Something went wrong!');
        setLoading(false);

        return;
      } finally {
        // setting load to false
        setLoading(false);
      }
    };

    getWeatherDataFromAPI();
  }, [latitude, longitude]);

  return {weatherData, errorMsg, loading};
};
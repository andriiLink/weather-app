import { useEffect, useState } from 'react';

import { WeatherAPI } from '../servises/api';
import { WeatherDataType } from '../types/weather';

export const useWeather = (latitude: number | null, longitude: number | null) => {
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWeatherDataFromAPI = async () => {
      try {
        if (latitude === null || longitude === null) {
          return;
        }

        let weatherDataFromAPI = await WeatherAPI.getData(latitude, longitude);

        if (!weatherDataFromAPI) {
          setErrorMsg('Something wrong with connection');

          return;
        }

        setWeatherData(weatherDataFromAPI);
      } catch (error) {
        setErrorMsg('Something went wrong!');
        setLoading(false);

        return;
      } finally {
        setLoading(false);
      }
    };

    getWeatherDataFromAPI();
  }, [latitude, longitude]);

  return {weatherData, errorMsg, loading};
};
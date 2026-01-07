import { WeatherContext } from "@/app/_WeatherContext";
import { useContext } from "react";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('Unable to handle weather data!');
  }

  return context;
};

export default useWeatherContext;

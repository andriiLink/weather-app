import { WeatherContext } from "@/app/_WeatherContext";
import { useContext } from "react";

// hook works in pair with weather context
export const useWeatherContext = () => {
  // creating context value using hook useContext
  const context = useContext(WeatherContext);

  // validation if context had been created
  if (!context) {
    throw new Error('Unable to handle weather data!');
  }

  return context;
};

export default useWeatherContext;

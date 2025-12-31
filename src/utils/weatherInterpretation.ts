import { WeatherInterpretation } from '../types/weatherInterpretation';
import { useTranslation } from 'react-i18next';

export const getWeatherInterpretation = (code: number, isDay: number): WeatherInterpretation => {
  // turning isDay variable to 0 or 1 (it's already in that format but just to ensure) 
  const day = !!isDay;

  const interpretation: Record<number, WeatherInterpretation> = {
    0: { 
      label: 'weather.conditions.clear_sky', 
      icon: day ? 'weather-sunny' : 'weather-night',
      gradient: day ? ['#4facfe', '#00f2fe'] : ['#243b55', '#141e30'],
      textColor: "#fff",
    },
    1: { 
      label: 'weather.conditions.mainly_clear', 
      icon: day ? 'weather-partly-cloudy' : 'weather-night-partly-cloudy',
      gradient: day ? ['#4facfe', '#00f2fe'] : ['#243b55', '#141e30'],
      textColor: "#fff",
    },
    2: { 
      label: 'weather.conditions.partly_cloudy', 
      icon: 'weather-cloudy',
      gradient: day ? ['#50cc7f', '#f5d100'] : ['#09203f', '#537895'],
      textColor: "#fff",
    },
    3: { 
      label: 'weather.conditions.cloudy', 
      icon: 'weather-cloudy',
      gradient: ['#757f9a', '#d7dde8'],
      textColor: "#fff",
    },
    45: { 
      label: 'weather.conditions.fog', 
      icon: 'weather-fog',
      gradient: ['#3e5151', '#decba4'],
      textColor: "#fff",
    },
    48: { 
      label: 'weather.conditions.drizzle', 
      icon: 'weather-fog',
      gradient: ['#3e5151', '#decba4'],
      textColor: "#fff",
    },
    51: { 
      label: 'weather.conditions.light_drizzle', 
      icon: 'weather-rainy',
      gradient: ['#6a11cb', '#2575fc'],
      textColor: "#fff",
    },
    61: { 
      label: 'weather.conditions.light_rain', 
      icon: 'weather-rainy',
      gradient: ['#00c6fb', '#005bea'],
      textColor: "#fff",
    },
    63: { 
      label: 'weather.conditions.moderate_rain', 
      icon: 'weather-pouring',
      gradient: ['#203a43', '#2c5364'],
      textColor: "#fff",
    },
    71: { 
      label: 'weather.conditions.light_snow', 
      icon: 'weather-snowy',
      gradient: ['#e6e9f0', '#eef1f5'],
      textColor: "#000",
    },
    95: { 
      label: 'weather.conditions.thunderstorm', 
      icon: 'weather-lightning',
      gradient: ['#0f0c29', '#302b63', '#24243e'],
      textColor: "#fff",
    }
  }

  // return iterpretation with appropriate code or with 0 by default
  return interpretation[code] || interpretation[0];
};
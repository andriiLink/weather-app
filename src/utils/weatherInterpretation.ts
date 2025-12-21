import { WeatherInterpretation } from '../types/weatherInterpretation';

export const getWeatherInterpretation = (code: number, isDay: number): WeatherInterpretation => {
  // turning isDay variable to 0 or 1 (it's already in that format but just to ensure) 
  const day = !!isDay;

  const interpretation: Record<number, WeatherInterpretation> = {
    0: { 
      label: 'Ясно', 
      icon: day ? 'weather-sunny' : 'weather-night',
      gradient: day ? ['#4facfe', '#00f2fe'] : ['#243b55', '#141e30']
    },
    1: { 
      label: 'Переважно ясно', 
      icon: day ? 'weather-partly-cloudy' : 'weather-night-partly-cloudy',
      gradient: day ? ['#4facfe', '#00f2fe'] : ['#243b55', '#141e30']
    },
    2: { 
      label: 'Мінлива хмарність', 
      icon: 'weather-cloudy',
      gradient: day ? ['#50cc7f', '#f5d100'] : ['#09203f', '#537895']
    },
    3: { 
      label: 'Хмарно', 
      icon: 'weather-cloudy',
      gradient: ['#757f9a', '#d7dde8']
    },
    45: { 
      label: 'Туман', 
      icon: 'weather-fog',
      gradient: ['#3e5151', '#decba4']
    },
    48: { 
      label: 'Паморозь', 
      icon: 'weather-fog',
      gradient: ['#3e5151', '#decba4']
    },
    51: { 
      label: 'Легка мряка', 
      icon: 'weather-rainy',
      gradient: ['#6a11cb', '#2575fc']
    },
    61: { 
      label: 'Невеликий дощ', 
      icon: 'weather-rainy',
      gradient: ['#00c6fb', '#005bea']
    },
    63: { 
      label: 'Помірний дощ', 
      icon: 'weather-pouring',
      gradient: ['#203a43', '#2c5364']
    },
    71: { 
      label: 'Невеликий сніг', 
      icon: 'weather-snowy',
      gradient: ['#e6e9f0', '#eef1f5']
    },
    95: { 
      label: 'Гроза', 
      icon: 'weather-lightning',
      gradient: ['#0f0c29', '#302b63', '#24243e']
    }
  }

  // return iterpretation with appropriate code or with 0 by default
  return interpretation[code] || interpretation[0];
};
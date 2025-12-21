// type for how our data about weather will look like
export type WeatherDataType = {
  current: {
    temperature_2m: number;
    weather_code: number;
    relative_humidity_2m: number;
    is_day: number;
    wind_speed_10m: number
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

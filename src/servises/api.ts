const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

const getDataFromAPI = async (latitude: number | null, longitude: number | null) => {
  const weatherData = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);

  if (!weatherData.ok) {
    return;
  }

  return weatherData.json();
};

export const WeatherAPI = {
  getData: getDataFromAPI,
}
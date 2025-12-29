// base url is the same in any fetch request
const BASE_URL = `https://api.open-meteo.com/v1/forecast`;

const getDataFromAPI = async (latitude: number | null, longitude: number | null) => {
  // fetching data from url we make
  const weatherData = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,is_day,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
  
  // checking if we eventually get our data
  if (!weatherData.ok) {
    return;
  }

  // make json from our fetched data and return it
  return weatherData.json();
};

export const WeatherAPI = {
  // method for getting info from API
  getData: getDataFromAPI,
}
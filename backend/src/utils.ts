import { WeatherData, WeatherResponse } from "./types";
import "dotenv/config";

export function formatWeatherData(data: WeatherResponse): WeatherData {
  const response: WeatherData = {
    cityInfo: {
      id: data.id,
      name: data.name,
      timezone: data.timezone,
    },
    coord: {
      lon: data.coord.lon,
      lat: data.coord.lat,
    },
    weather: data.weather,
    visibility: data.visibility,
    temprature: {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
    },
    wind: data.wind,
  };

  response.weather.forEach((elem) => {
    elem.icon = `${process.env.OPEN_WEATHER_ICON_URL}${elem.icon}.png`;
  });

  return response;
}

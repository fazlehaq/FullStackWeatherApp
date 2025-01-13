export interface ErrorResponse {
  status: string;
  message: string;
  details?: any;
}

interface Co_Ordinate {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Tempratures {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface CityInfo {
  id: number;
  name: string;
  timezone: number;
}

export interface WeatherData {
  cityInfo: CityInfo;
  coord: Co_Ordinate;
  weather: Weather[];
  visibility: number;
  temprature: Tempratures;
  wind: Wind;
}

export interface WeatherResponse {
  coord: Co_Ordinate;
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

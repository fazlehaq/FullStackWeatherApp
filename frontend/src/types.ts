export interface SearchOption {
  cityName?: string;
  cityId?: string;
  units?: string;
}

export interface FetchErrorResponse {
  status: string;
  message: string;
  details?: unknown;
}

export interface SuccessResponse {
  status: string;
  data: WeatherData;
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

export interface CitySuggestion {
  id: number;
  name: string;
  country?: string;
}

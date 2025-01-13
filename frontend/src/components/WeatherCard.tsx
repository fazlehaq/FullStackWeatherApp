import React from "react";
import { FetchErrorResponse, WeatherData } from "../types";

interface WeatherCardProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: FetchErrorResponse | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  if (weatherData != null)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {weatherData.cityInfo.name}
        </h2>

        {/* Weather Icon and Description */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={weatherData.weather[0].icon}
            alt="weather icon"
            className="w-24 h-24 mr-4"
          />
          <div className="text-xl font-semibold text-gray-700">
            {weatherData.weather[0].description}
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Latitude:</strong> {weatherData.coord.lat}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Longitude:</strong> {weatherData.coord.lon}
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18a2 2 0 01-2 2H7a2 2 0 01-2-2V3z"
              />
            </svg>
            <div>
              <strong>Temp:</strong> {weatherData.temprature.temp}°C
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Feels Like:</strong> {weatherData.temprature.feels_like}°C
            </div>
          </div>
        </div>

        {/* Min/Max Temperature */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Min Temp:</strong> {weatherData.temprature.temp_min}°C
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Max Temp:</strong> {weatherData.temprature.temp_max}°C
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-300">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Humidity:</strong> {weatherData.temprature.humidity}%
            </div>
          </div>
        </div>

        {/* Wind */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2l3 7-5 1 5 1-3 7-3-7 5-1-5-1 3-7z"
              />
            </svg>
            <div>
              <strong>Wind Degree:</strong> {weatherData.wind.deg}°
            </div>
          </div>
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
        <div className="text-xl font-semibold text-red-600 capitalize">
          {error.message}
        </div>
      </div>
    );

  return <></>;
};

export default WeatherCard;

import axios from "axios";
import {
  SearchOption,
  FetchErrorResponse,
  SuccessResponse,
  WeatherData,
  CitySuggestion,
} from "./types";

export const fetchWeatherData = async (
  searchOption: SearchOption
): Promise<FetchErrorResponse | SuccessResponse> => {
  // validating if city name or city id is provided
  if (searchOption.cityName == undefined && searchOption.cityId == undefined) {
    return Promise.resolve({
      status: "error",
      message: "City Name or City Id is required",
    });
  }

  // building url to the api
  const url = new URL(import.meta.env.VITE_BACKEND_API_BASE_URL as string);
  url.pathname = `${url.pathname}weather`;
  // appending search parameters to the url
  if (searchOption.cityId)
    url.searchParams.append("cityId", searchOption.cityId);
  else if (searchOption.cityName)
    url.searchParams.append("cityName", searchOption.cityName);

  // making sure the unit is valid and if not ignoring the unit
  if (
    searchOption.units &&
    ["metric", "standard", "imperial"].includes(searchOption.units)
  )
    url.searchParams.append("units", searchOption.units);

  try {
    const response = await axios.get(url.toString());
    return {
      status: "success",
      data: response.data as WeatherData,
    };
  } catch (error) {
    console.error(error);

    // non axios errors
    if (!axios.isAxiosError(error)) {
      console.error("Unknown Error: ", error);
      return {
        status: "error",
        message: "An unexpected error occurred",
        details: error,
      };
    }

    // axios errors (responses with range other than 2xx status code)
    if (error.response) {
      console.error("API Response Error: ", error.response.data);

      switch (error.response.status) {
        case 400:
          return {
            status: "error",
            message: error.response.data.message || "Bad Request",
            details: {
              statusCode: error.response.status,
              data: error.response.data,
            },
          };

        case 404:
          return {
            status: "error",
            message: error.response.data.message || "City not found",
            details: {
              statusCode: error.response.status,
              data: error.response.data,
            },
          };

        case 504:
          return {
            status: "error",
            message: "Network Or Server Issue. Please try again later.",
          };

        case 500:
          return {
            status: "error",
            message: "Internal Server Error",
          };
      }
    }
  }

  return {
    status: "error",
    message: "unknown error",
  };
};

export const fetchCitySuggestions = async (
  cityName: string,
  signal?: AbortSignal
): Promise<CitySuggestion[]> => {
  if (cityName.length === 0) return Promise.resolve([]);

  const url = new URL(import.meta.env.VITE_BACKEND_API_BASE_URL as string);
  url.pathname = `${url.pathname}city_suggestions`;
  url.pathname = `${url.pathname}/${cityName}`;

  try {
    const response = await axios.get(url.toString(), { signal });
    return response.data.suggestions;
  } catch (error) {
    // If the request was aborted, we don't need to handle it as an error
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error(error);
    }
    return [];
  }
};

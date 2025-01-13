import "./App.css";
import { useEffect, useState, useRef } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import useSearchHistory from "./hooks/useSearchHistory";
import {
  SuccessResponse,
  FetchErrorResponse,
  WeatherData,
  CitySuggestion,
} from "./types";
import { fetchWeatherData, fetchCitySuggestions } from "./services";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<FetchErrorResponse | null>(null);
  const [showSearchHistory, setShowSearchHistory] = useState<boolean>(false);
  const [searchHistory, addSearchHistory, removeSearchHistory] =
    useSearchHistory();
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);

  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setDisplaySuggestions(false);
      return;
    }

    // Clear the previous debounce timer if query changes
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      // Create a new AbortController for each request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Fetch city suggestions with abort signal
      fetchCitySuggestions(query, abortController.signal)
        .then((response) => {
          if (abortControllerRef.current?.signal.aborted) {
            return; // Ignore if request was aborted
          }
          setSuggestions(response);
          setDisplaySuggestions(true);
        })
        .catch((error) => {
          if (abortControllerRef.current?.signal.aborted) {
            return; // Ignore if request was aborted
          }
          console.error("Error fetching suggestions:", error);
        });
    }, 500); // Debounce delay (500ms)

    // Cleanup on query change or unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Abort the previous request if query changes
      }
    };
  }, [query]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSearchHistory(false);
    setDisplaySuggestions(false);
    setIsLoading(true);

    addSearchHistory(query);

    const response: SuccessResponse | FetchErrorResponse =
      await fetchWeatherData({ cityName: query });

    if (response.status === "error") {
      setError(response as FetchErrorResponse);
      setWeatherData(null);
    } else if (response.status === "success") {
      setWeatherData((response as SuccessResponse).data);
      setError(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-semibold text-gray-800 pt-2 mb-8">
        Weather App
      </h1>
      <div className="w-full max-w-lg">
        <SearchBox
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          onSearch={handleSearch}
          searchHistory={searchHistory}
          removeSearchHistory={removeSearchHistory}
          showSearchHistory={showSearchHistory}
          setShowSearchHistory={setShowSearchHistory}
          suggestions={suggestions}
          displaySuggestions={displaySuggestions}
          setDisplaySuggestions={setDisplaySuggestions}
        />
      </div>
      <div className="w-full max-w-lg mt-8">
        <WeatherCard
          isLoading={isLoading}
          error={error}
          weatherData={weatherData}
        />
      </div>
    </div>
  );
}

export default App;

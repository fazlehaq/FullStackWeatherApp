import React, { useRef } from "react";
import { CitySuggestion } from "../types";

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  searchHistory: string[];
  removeSearchHistory: (search: string) => void;
  showSearchHistory: boolean;
  setShowSearchHistory: React.Dispatch<React.SetStateAction<boolean>>;
  suggestions: CitySuggestion[];
  displaySuggestions: boolean;
  setDisplaySuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  query,
  setQuery,
  isLoading,
  onSearch,
  searchHistory,
  removeSearchHistory,
  showSearchHistory,
  setShowSearchHistory,
  suggestions,
  displaySuggestions,
  setDisplaySuggestions,
}) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    if (query.trim() === "") {
      setShowSearchHistory(true);
    } else {
      setDisplaySuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSearchHistory(false); // Hide search history when typing
    setDisplaySuggestions(true); // Show suggestions while typing
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(document.activeElement)
      ) {
        setShowSearchHistory(false);
        setDisplaySuggestions(false);
      }
    }, 250);
  };

  const handleSelectSearchHistory = (search: string) => {
    setQuery(search);
    setShowSearchHistory(false);
    setDisplaySuggestions(false);
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    setQuery(suggestion.name);
    setShowSearchHistory(false);
    setDisplaySuggestions(false);
  };

  const handleRemoveSearchHistory = (e: React.MouseEvent, search: string) => {
    e.stopPropagation(); // Prevent onBlur from being triggered
    removeSearchHistory(search);
  };

  return (
    <div
      ref={searchBoxRef}
      className="relative w-full max-w-lg mx-auto"
      onBlur={handleBlur}
    >
      <form
        onSubmit={onSearch}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg shadow-sm p-2"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter City Name"
          autoFocus={true}
          aria-label="Query Weather City"
          className="w-full text-lg p-2 border-none outline-none rounded-lg focus:ring focus:ring-blue-300"
          onClick={handleInputClick}
        />
        <button
          type="button"
          onClick={() => setQuery("")}
          className="text-xl text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
        <button
          className={`text-white px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? `Loading...` : `Search`}
        </button>
      </form>

      {/* Suggestions Drawer */}
      {displaySuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="px-4 py-2 hover:bg-gray-100">
              <button
                onClick={() => handleSelectSuggestion(suggestion)}
                className="text-left w-full text-gray-800"
              >
                {suggestion.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search History Drawer */}
      {showSearchHistory &&
        suggestions.length === 0 &&
        searchHistory.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {searchHistory.map((search) => (
              <div
                key={search}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
              >
                <button
                  onClick={() => handleSelectSearchHistory(search)}
                  className="text-left w-full text-gray-800"
                >
                  {search}
                </button>
                <button
                  onClick={(e) => handleRemoveSearchHistory(e, search)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default SearchBox;

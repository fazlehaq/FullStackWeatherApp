import useLocalStorage from "./useLocalStorage";

export default function useSearchHistory(): [
  string[],
  (search: string) => void,
  (search: string) => void
] {
  const MAX_SIZE = 5;
  const KEY: string =
    (import.meta.env.VITE_SEARCH_HISTORY_KEY as string) ?? "SEARCH_HISTORY";

  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(KEY, []);

  function addSearchToHistory(search: string): void {
    const uniqueHistory = searchHistory.filter((history) => history !== search);
    const newHistory = [search, ...uniqueHistory];
    const limitedHistory = newHistory.slice(0, MAX_SIZE);
    setSearchHistory(limitedHistory);
  }

  function removeSearchFromHistory(search: string): void {
    const newHistory = searchHistory.filter((history) => history !== search);
    setSearchHistory(newHistory);
  }

  return [searchHistory, addSearchToHistory, removeSearchFromHistory];
}

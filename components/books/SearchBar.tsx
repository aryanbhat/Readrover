import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockBooks } from "@/data/books";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return mockBooks
      .filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
  }, [searchQuery]);

  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        className="h-10 pl-9"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto z-50">
          {suggestions.map((book) => (
            <div
              key={book.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => {
                onSearchChange(book.title);
                setShowSuggestions(false);
              }}
            >
              <div className="font-medium">{book.title}</div>
              <div className="text-sm text-gray-500">{book.author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

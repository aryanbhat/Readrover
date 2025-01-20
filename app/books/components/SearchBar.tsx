"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestions: Array<{ type: string; text: string }>;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: SearchBarProps) {
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
        <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-secondary cursor-pointer flex items-center gap-2"
              onClick={() => {
                onSearchChange(suggestion.text);
                setShowSuggestions(false);
              }}
            >
              <span className="text-xs text-muted-foreground capitalize">
                {suggestion.type}:
              </span>
              <span>{suggestion.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar } from "./components/SearchBar";
import { FilterSheet } from "./components/FilterSheet";
import { BookCard } from "./components/BookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

import { mockBooks, genres, years, ratings, priceRanges } from "@/data/books";
import { Book } from "@/data/books";

export default function BooksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "All Genres"
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || "All Years"
  );
  const [selectedRating, setSelectedRating] = useState(
    searchParams.get("rating") || "All Ratings"
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("price") || "All Prices"
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 100,
  ]);
  const [ratingValue, setRatingValue] = useState([
    Number(searchParams.get("minRating")) || 3.5,
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURLParams({ q: value });
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    updateURLParams({ genre: value === "All Genres" ? "" : value });
  };

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];

    const searchLower = searchQuery.toLowerCase();
    const titleMatches = mockBooks
      .filter((book: Book) => book.title.toLowerCase().includes(searchLower))
      .map((book: Book) => ({ type: "title", text: book.title }));

    const authorMatches = mockBooks
      .filter((book: Book) => book.author.toLowerCase().includes(searchLower))
      .map((book: Book) => ({ type: "author", text: book.author }));

    const uniqueResults = [...titleMatches, ...authorMatches]
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.text === item.text)
      )
      .slice(0, 5);

    return uniqueResults;
  }, [searchQuery]);

  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const searchMatch =
        !searchQuery ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const genreMatch =
        selectedGenre === "All Genres" || book.genre === selectedGenre;

      const ratingMatch = book.rating >= ratingValue[0];

      const priceMatch =
        book.price >= priceRange[0] && book.price <= priceRange[1];

      return searchMatch && genreMatch && ratingMatch && priceMatch;
    });
  }, [searchQuery, selectedGenre, ratingValue, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
          <div className="flex flex-wrap gap-2">
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FilterSheet
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              years={years}
              updateURLParams={updateURLParams}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchQuery("")}
            >
              Search: {searchQuery} ×
            </Button>
          )}
          {selectedGenre !== "All Genres" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedGenre("All Genres")}
            >
              {selectedGenre} ×
            </Button>
          )}
          {selectedYear !== "All Years" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedYear("All Years")}
            >
              {selectedYear} ×
            </Button>
          )}
          {ratingValue[0] > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setRatingValue([0])}
              className="flex items-center gap-1"
            >
              <span>{ratingValue[0]}+</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </Button>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 100) && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPriceRange([0, 100])}
            >
              ${priceRange[0]} - ${priceRange[1]} ×
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No books found matching your criteria.
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Star } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const mockBooks = [
  {
    id: 1,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    year: "1954",
    price: 19.99,
    rating: 4.8,
    description:
      "A captivating story that takes readers on an unforgettable journey through Middle-earth.",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    year: "1949",
    price: 12.99,
    rating: 4.6,
    description:
      "A dystopian social science fiction novel that explores surveillance and totalitarianism.",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: "1813",
    price: 9.99,
    rating: 4.5,
    description:
      "A romantic novel following the emotional development of Elizabeth Bennet.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925",
    price: 14.99,
    rating: 4.3,
    description:
      "A story of decadence and excess that explores the American Dream in the 1920s.",
  },
  {
    id: 5,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925",
    price: 14.99,
    rating: 4.3,
    description:
      "A story of decadence and excess that explores the American Dream in the 1920s.",
  },
  {
    id: 6,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925",
    price: 14.99,
    rating: 4.3,
    description:
      "A story of decadence and excess that explores the American Dream in the 1920s.",
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925",
    price: 14.99,
    rating: 4.3,
    description:
      "A story of decadence and excess that explores the American Dream in the 1920s.",
  },
];

const genres = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Biography",
];

const years = [
  "All Years",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
];

const ratings = ["All Ratings", "4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"];
const priceRanges = [
  "All Prices",
  "Under $5",
  "$5 - $10",
  "$10 - $20",
  "$20 - $30",
  "Over $30",
];

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
      .filter((book) => book.title.toLowerCase().includes(searchLower))
      .map((book) => ({ type: "title", text: book.title }));

    const authorMatches = mockBooks
      .filter((book) => book.author.toLowerCase().includes(searchLower))
      .map((book) => ({ type: "author", text: book.author }));

    // Remove duplicates and limit results
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
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
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
                      handleSearchChange(suggestion.text);
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Filter Books</SheetTitle>
                  <SheetDescription>
                    Refine your search with advanced filters
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-4">
                    <h4 className="font-medium leading-none">Price Range</h4>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-3">
                        Price: ${priceRange[0]} - ${priceRange[1]}
                      </p>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>$0</span>
                        <span>$100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium leading-none">Minimum Rating</h4>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < ratingValue[0]
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {ratingValue[0]} & up
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={5}
                        step={0.5}
                        value={ratingValue}
                        onValueChange={setRatingValue}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>0★</span>
                        <span>5★</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Publication Year
                    </h4>
                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedGenre("All Genres");
                        setSelectedYear("All Years");
                        setPriceRange([0, 100]);
                        setRatingValue([3.5]);
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
            filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[2/3] relative">
                  <Image
                    src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg"
                    alt={`${book.title} cover`}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(book.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-400 text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1">{book.rating.toFixed(1)}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                    ${book.price.toFixed(2)}
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {book.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {book.genre}
                    </span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {book.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

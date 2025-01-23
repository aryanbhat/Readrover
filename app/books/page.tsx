"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import { genres, years } from "@/data/books";
import { Book } from "@/data/books";
import { useQuery } from "@apollo/client";
import {
  AUTOCOMPLETE_SEARCH,
  SEARCH_BOOKS,
  // GET_BOOKS_COUNT,
} from "@/lib/queries";

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

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 1,
    Number(searchParams.get("maxPrice")) || 900,
  ]);

  const [yearRange, setYearRange] = useState([
    Number(searchParams.get("minYear")) || 1900,
    Number(searchParams.get("maxYear")) || 2025,
  ]);

  const [ratingValue, setRatingValue] = useState(
    Number(searchParams.get("minRating")) || 0
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const booksPerPage = 12;

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

  const {
    data: booksData,
    loading: booksLoading,
    error: booksError,
  } = useQuery(SEARCH_BOOKS, {
    variables: {
      query: searchQuery,
      from: (currentPage - 1) * booksPerPage,
      size: booksPerPage,
      filters: {
        genre: selectedGenre === "All Genres" ? "" : selectedGenre,
        rating: ratingValue,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      },
    },
  });

  const paginatedBooks = useMemo(() => {
    if (booksLoading || booksError || !booksData)
      return { books: [], totalBooks: 0, totalPages: 0 };

    const books = booksData.search.books;
    const totalBooks = booksData?.search?.total || 0;
    const totalPages = booksData?.search?.pages || 0;

    return {
      books,
      totalBooks,
      totalPages,
    };
  }, [booksData, booksLoading, booksError]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURLParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <div className="flex flex-wrap gap-2">
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              {genres && (
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </Select>
            <FilterSheet
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              yearRange={yearRange}
              setYearRange={setYearRange}
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
              onClick={() => {
                setSearchQuery("");
                updateURLParams({ q: "" });
              }}
            >
              Search: {searchQuery} ×
            </Button>
          )}
          {selectedGenre !== "All Genres" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedGenre("All Genres");
                updateURLParams({ genre: "" });
              }}
            >
              {selectedGenre} ×
            </Button>
          )}
          {selectedYear !== "All Years" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedYear("All Years");
                updateURLParams({ year: "" });
              }}
            >
              {selectedYear} ×
            </Button>
          )}
          {ratingValue > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setRatingValue(0);
                updateURLParams({ minRating: "" });
              }}
              className="flex items-center gap-1"
            >
              <span>{ratingValue}+</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />×
            </Button>
          )}
          {(priceRange[0] > 1 || priceRange[1] < 900) && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setPriceRange([1, 900]);
                updateURLParams({ minPrice: "", maxPrice: "" });
              }}
            >
              ${priceRange[0]} - ${priceRange[1]} ×
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {booksLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">Loading books...</p>
            </div>
          ) : paginatedBooks.books.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No books found matching your criteria.
              </p>
            </div>
          ) : (
            paginatedBooks.books.map((book: Book) => (
              <BookCard key={book.bookId} book={book} />
            ))
          )}
        </div>

        {paginatedBooks.books.length > 0 && paginatedBooks.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: paginatedBooks.totalPages },
                (_, i) => i + 1
              )
                .filter(
                  (page) =>
                    page === 1 ||
                    page === paginatedBooks.totalPages ||
                    Math.abs(currentPage - page) <= 1
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginatedBooks.totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {searchQuery &&
          paginatedBooks.books.length > 0 &&
          paginatedBooks.totalBooks > 0 &&
          !booksLoading &&
          !booksError && (
            <div className="text-center text-sm text-muted-foreground mt-4">
              Showing {(currentPage - 1) * booksPerPage + 1} to{" "}
              {Math.min(currentPage * booksPerPage, paginatedBooks.totalBooks)}{" "}
              of {paginatedBooks.totalBooks} books
            </div>
          )}
      </div>
    </div>
  );
}

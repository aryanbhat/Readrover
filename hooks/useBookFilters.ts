import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export function useBookFilters(searchParams: URLSearchParams, router: any) {
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get("genre") || "All Genres"
  );
  const [selectedYear, setSelectedYear] = useState(
    searchParams.get("year") || "All Years"
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 100,
  ]);
  const [ratingValue, setRatingValue] = useState([
    Number(searchParams.get("minRating")) || 3.5,
  ]);

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

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    updateURLParams({ genre: genre === "All Genres" ? "" : genre });
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    updateURLParams({ year: year === "All Years" ? "" : year });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    updateURLParams({
      minPrice: values[0].toString(),
      maxPrice: values[1].toString(),
    });
  };

  const handleRatingChange = (value: number[]) => {
    setRatingValue(value);
    updateURLParams({ minRating: value[0].toString() });
  };

  const handleFiltersReset = () => {
    setSearchQuery("");
    setSelectedGenre("All Genres");
    setSelectedYear("All Years");
    setPriceRange([0, 100]);
    setRatingValue([3.5]);
    router.push("/");
  };

  const handleFilterChange = {
    year: handleYearChange,
    price: handlePriceRangeChange,
    rating: handleRatingChange,
  };

  return {
    searchQuery,
    selectedGenre,
    selectedYear,
    priceRange,
    ratingValue,
    handleSearchChange,
    handleGenreChange,
    handleFiltersReset,
    handleFilterChange,
  };
}

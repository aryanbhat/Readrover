"use client";

import { Button } from "@/components/ui/button";
import { Filter, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterSheetProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  yearRange: number[];
  setYearRange: (range: number[]) => void;
  ratingValue: number;
  setRatingValue: (rating: number) => void;
  years: string[];
  updateURLParams: (params: Record<string, string>) => void;
}

export function FilterSheet({
  selectedYear,
  setSelectedYear,
  selectedGenre,
  setSelectedGenre,
  priceRange,
  setPriceRange,
  yearRange,
  setYearRange,
  ratingValue,
  setRatingValue,
  years,
  updateURLParams,
}: FilterSheetProps) {
  // Add temporary states for filter values

  const [open, setOpen] = useState(false);
  const [tempYear, setTempYear] = useState(selectedYear);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [tempRatingValue, setTempRatingValue] = useState(ratingValue);
  const [tempYearRange, setTempYearRange] = useState(yearRange);

  const applyFilters = () => {
    setSelectedYear(tempYear);
    setPriceRange(tempPriceRange);
    setRatingValue(tempRatingValue);
    setYearRange(tempYearRange);
    updateURLParams({
      // year: tempYear,
      minPrice: tempPriceRange[0].toString(),
      maxPrice: tempPriceRange[1].toString(),
      minRating: tempRatingValue.toString(),
      // minYear: tempYearRange[0].toString(),
      // maxYear: tempYearRange[1].toString(),
    });
    setOpen(false);
  };

  const resetFilters = () => {
    setSelectedYear("All Years");
    setPriceRange([1, 900]);
    setRatingValue(0);
    setYearRange([1900, 2025]);
    setSelectedGenre("All Genres");
    updateURLParams({
      year: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
      minYear: "",
      maxYear: "",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
                Price: ${tempPriceRange[0]} - ${tempPriceRange[1]}
              </p>
              <Slider
                min={1}
                max={900}
                step={1}
                value={[tempPriceRange[0], tempPriceRange[1]]}
                onValueChange={(value) =>
                  setTempPriceRange(value as [number, number])
                }
                className="w-full"
                minStepsBetweenThumbs={1}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>$1</span>
                <span>$900</span>
              </div>
            </div>
          </div>
          {/* 
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Price Range</h4>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                Year: {tempYearRange[0]} - {tempYearRange[1]}
              </p>
              <Slider
                min={1900}
                max={2025}
                step={1}
                value={[tempYearRange[0], tempYearRange[1]]}
                onValueChange={(value) =>
                  setTempYearRange(value as [number, number])
                }
                className="w-full"
                minStepsBetweenThumbs={1}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1900</span>
                <span>2025</span>
              </div>
            </div>
          </div> */}

          <div className="space-y-4">
            <h4 className="font-medium leading-none">Minimum Rating</h4>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < tempRatingValue
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {tempRatingValue} & up
                </span>
              </div>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={[tempRatingValue]}
                onValueChange={(value) => setTempRatingValue(value[0])}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0★</span>
                <span>5★</span>
              </div>
            </div>
          </div>
          {/* 
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Publication Year</h4>
            <Select value={tempYear} onValueChange={setTempYear}>
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
          </div> */}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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
  ratingValue: number[];
  setRatingValue: (rating: number[]) => void;
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

  const applyFilters = () => {
    setSelectedYear(tempYear);
    setPriceRange(tempPriceRange);
    setRatingValue(tempRatingValue);
    updateURLParams({
      year: tempYear,
      minPrice: tempPriceRange[0].toString(),
      maxPrice: tempPriceRange[1].toString(),
      minRating: tempRatingValue[0].toString(),
    });
    setOpen(false);
  };

  const resetFilters = () => {
    setTempYear("All Years");
    setTempPriceRange([0, 100]);
    setTempRatingValue([3.5]);
    setSelectedGenre("All Genres");
    updateURLParams({
      year: "",
      minPrice: "",
      maxPrice: "",
      minRating: "",
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
                min={0}
                max={100}
                step={1}
                value={[tempPriceRange[0], tempPriceRange[1]]}
                onValueChange={(value) =>
                  setTempPriceRange(value as [number, number])
                }
                className="w-full"
                minStepsBetweenThumbs={1}
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
                        i < tempRatingValue[0]
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {tempRatingValue[0]} & up
                </span>
              </div>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={tempRatingValue}
                onValueChange={setTempRatingValue}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0★</span>
                <span>5★</span>
              </div>
            </div>
          </div>

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
          </div>

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

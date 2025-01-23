"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Book } from "@/data/books";
import { useQuery } from "@apollo/client";
import { AUTOCOMPLETE_SEARCH } from "@/lib/queries";
import { useDebounce } from "@/hooks/useDebounce";
import AnimatedNumbers from "react-animated-numbers";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { data, loading, error } = useQuery(AUTOCOMPLETE_SEARCH, {
    variables: {
      query: debouncedSearchQuery,
      size: 6,
    },
    skip: !debouncedSearchQuery,
  });

  const suggestions = useMemo(() => {
    if (!debouncedSearchQuery || loading || error || !data) return [];

    const books = data.search.books;
    const titleSuggestions = books.map((book: Book) => ({
      type: "title",
      text: book.title || "",
    }));

    const authorSuggestions = books.flatMap((book: Book) =>
      (book.author || []).map((authorName: string) => ({
        type: "author",
        text: authorName,
      }))
    );

    const uniqueResults = [...titleSuggestions, ...authorSuggestions]
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.text === item.text)
      )
      .slice(0, 5);

    return uniqueResults;
  }, [debouncedSearchQuery, data, loading, error]);
  const router = useRouter();
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/books?q=${debouncedSearchQuery}`);
    }
  }

  function handleSearch(query?: string) {
    router.push(`/books?q=${query || searchQuery}`);
  }

  return (
    <main className="h-full bg-background">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Discover Your Next
          <span className="block text-primary">Great Read</span>
        </h1>

        <p className="text-muted-foreground text-center max-w-[600px] text-lg">
          Search millions of books to find your next reading adventure
        </p>

        <div className="w-full max-w-2xl flex gap-2 relative">
          <Input
            type="text"
            placeholder="Search by title, author, or keyword..."
            className="h-12"
            value={searchQuery}
            onFocus={() => {
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-12 w-full mt-1 bg-background border rounded-md shadow-lg z-50">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-secondary cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSearchQuery(suggestion.text);
                    handleSearch(suggestion.text);
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
          <Button
            size="lg"
            className="h-12 px-6"
            onClick={() => {
              handleSearch();
            }}
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={100000}
              fontStyle={{
                fontSize: 40,
                fontWeight: "bold",
              }}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
            />
            <div className="text-muted-foreground">Books</div>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={200000}
              fontStyle={{
                fontSize: 40,
                fontWeight: "bold",
              }}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
            />
            <div className="text-muted-foreground">Authors</div>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={50}
              fontStyle={{
                fontSize: 40,
                fontWeight: "bold",
              }}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
            />
            <div className="text-muted-foreground">Genres</div>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={100000}
              fontStyle={{
                fontSize: 40,
                fontWeight: "bold",
              }}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
            />
            <div className="text-muted-foreground">Readers</div>
          </div>
        </div>
      </div>
    </main>
  );
}

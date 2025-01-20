"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/books?q=${searchQuery}`);
    }
  }

  function handleSearch() {
    router.push(`/books?q=${searchQuery}`);
  }

  return (
    <main className="h-full bg-background ">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">
          Discover Your Next
          <span className="block text-primary">Great Read</span>
        </h1>

        <p className="text-muted-foreground text-center max-w-[600px] text-lg">
          Search millions of books to find your next reading adventure
        </p>

        <div className="w-full max-w-2xl flex gap-2">
          <Input
            type="text"
            placeholder="Search by title, author, or keyword..."
            className="h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="lg" className="h-12 px-6" onClick={handleSearch}>
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-bold text-2xl text-primary">10M+</div>
            <div className="text-muted-foreground">Books</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-primary">500K+</div>
            <div className="text-muted-foreground">Authors</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-primary">50+</div>
            <div className="text-muted-foreground">Genres</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-primary">1M+</div>
            <div className="text-muted-foreground">Readers</div>
          </div>
        </div>
      </div>
    </main>
  );
}

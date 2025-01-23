"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Book {
  bookId?: string;
  title?: string;
  author?: string[];
  genres?: string[];
  publishDate?: string;
  price?: string;
  rating?: number;
  description?: string;
  coverImg?: string;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  return (
    <Card
      key={book.bookId}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/books/${book.bookId}`)}
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={book.coverImg || "https://via.placeholder.com/150"}
          alt={`${book.title || "Book"} cover`}
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
                  i < Math.floor(book.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-400 text-gray-400"
                }`}
              />
            ))}
          </div>
          <span className="ml-1">{(book.rating || 0).toFixed(1)}</span>
        </div>
        {book.price && !isNaN(parseFloat(book.price)) && (
          <div className="absolute bottom-2 right-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
            ${parseFloat(book.price).toFixed(2)}
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {(book.author || []).join(", ")}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {book.description}
        </p>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {(book.genres || []).slice(0, 4).map((genre) => (
            <span
              key={genre}
              className="text-xs px-2 py-1 bg-secondary rounded-full whitespace-nowrap w-fit"
            >
              {genre}
            </span>
          ))}
          <span className="text-xs px-2 py-1 bg-secondary rounded-full">
            {book.publishDate}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

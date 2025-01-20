"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: string;
  price: number;
  rating: number;
  description: string;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
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
  );
}

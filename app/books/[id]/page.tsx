"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_DETAILS } from "@/lib/queries";
import type { Book } from "@/data/books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import { BookDetailsSkeleton } from "@/components/BookDetailsSkeleton";

const BookDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  console.log("Fetching book details for ID:", id);
  const { data, loading, error } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId: id },
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-background">
        <BookDetailsSkeleton />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Failed to fetch book details: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );

  const book: Book | null = data?.bookDetails || null;

  if (!book)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-warning">No Book Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The requested book could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative aspect-[2/3]">
            <Image
              src={book.coverImg || "/placeholder.svg?height=450&width=300"}
              alt={`${book.title || "Unknown book"} cover`}
              layout="fill"
              objectFit="cover"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <CardTitle className="text-3xl">{book.title}</CardTitle>
            {book.author && (
              <p className="text-lg text-muted-foreground mt-2">
                by {book.author.join(", ")}
              </p>
            )}
            {book.genres && book.genres.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {book.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
            {book.description && (
              <p className="mt-4 text-muted-foreground">{book.description}</p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-4">
              {book.publisher && (
                <p className="text-sm text-muted-foreground">
                  <strong>Publisher:</strong> {book.publisher}
                </p>
              )}
              {book.publishDate && (
                <p className="text-sm text-muted-foreground">
                  <strong>Published:</strong> {book.publishDate}
                </p>
              )}
              {book.isbn && (
                <p className="text-sm text-muted-foreground">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
              )}
              {book.language && (
                <p className="text-sm text-muted-foreground">
                  <strong>Language:</strong> {book.language}
                </p>
              )}
            </div>
            <div className="mt-4">
              {book.price && (
                <p className="text-lg font-semibold">
                  Price: <span className="text-green-600">${book.price}</span>
                </p>
              )}
              {book.rating && (
                <div className="flex items-center mt-2">
                  <span className="text-lg font-semibold mr-2">Rating:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(Number(book.rating))
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-muted-foreground">
                    ({book.numRatings} ratings)
                  </span>
                </div>
              )}
            </div>
            {/* {book.awards && book.awards.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Awards</h3>
                <ul className="mt-2 space-y-1">
                  {book.awards.split(",").map((award) => (
                    <li key={award} className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      <span className="text-muted-foreground">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetailsPage;

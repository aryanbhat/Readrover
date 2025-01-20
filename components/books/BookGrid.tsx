import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export function BookGrid({ books }: { books: any[] }) {
  if (books.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg text-muted-foreground">
          No books found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function BookCard({ book }: { book: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* ... existing book card content ... */}
    </Card>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadRover - Discover Your Next Great Read",
  description: "Search and discover millions of books in our extensive catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-between min-h-screen bg-background text-foreground antialiased`}
      >
        <ApolloWrapper>
          <header className="border-b shadow-sm">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
              >
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl tracking-tight">
                  ReadRover
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href={`/books?q=`}>
                  <Button variant="outline" className="hover:bg-primary/5">
                    Browse Books
                  </Button>
                </Link>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-8 bg-muted/30">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} ReadRover. All rights reserved.
            </div>
          </footer>
        </ApolloWrapper>
      </body>
    </html>
  );
}

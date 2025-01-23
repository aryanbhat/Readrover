export interface Book {
  bookId?: string;
  title?: string;
  author?: string[];
  rating?: number;
  description?: string;
  language?: string;
  isbn?: string;
  genres?: string[];
  pages?: string;
  publisher?: string;
  publishDate?: string;
  awards?: string;
  numRatings?: number;
  ratingsByStars?: number[];
  likedPercent?: number;
  coverImg?: string;
  price?: string;
  score?: number;
}

export const mockBooks: Book[] = [
  {
    bookId: "1",
    title: "The Lord of the Rings",
    author: ["J.R.R. Tolkien"],
    genres: ["Fantasy"],
    publishDate: "1954",
    price: "19.99",
    rating: 4.8,
    description:
      "A captivating story that takes readers on an unforgettable journey through Middle-earth.",
    coverImg:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546910265l/2.jpg",
  },
  {
    bookId: "2",
    title: "1984",
    author: ["George Orwell"],
    genres: ["Science Fiction"],
    publishDate: "1949",
    price: "12.99",
    rating: 4.6,
    description:
      "A dystopian social science fiction novel that explores surveillance and totalitarianism.",
  },
  {
    bookId: "3",
    title: "Pride and Prejudice",
    author: ["Jane Austen"],
    genres: ["Romance"],
    publishDate: "1813",
    price: "9.99",
    rating: 4.5,
    description:
      "A romantic novel following the emotional development of Elizabeth Bennet.",
  },
  {
    bookId: "4",
    title: "The Great Gatsby",
    author: ["F. Scott Fitzgerald"],
    genres: ["Fiction"],
    publishDate: "1925",
    price: "14.99",
    rating: 4.3,
    description:
      "A story of decadence and excess that explores the American Dream in the 1920s.",
  },
  {
    bookId: "5",
    title: "Dune",
    author: ["Frank Herbert"],
    genres: ["Science Fiction"],
    publishDate: "1965",
    price: "16.99",
    rating: 4.7,
    description:
      "A masterpiece of science fiction that combines politics, religion, and nature on a desert planet.",
  },
  {
    bookId: "6",
    title: "The Hobbit",
    author: ["J.R.R. Tolkien"],
    genres: ["Fantasy"],
    publishDate: "1937",
    price: "15.99",
    rating: 4.6,
    description:
      "A charming adventure following Bilbo Baggins on his journey to help reclaim a dwarf kingdom.",
  },
  {
    bookId: "7",
    title: "To Kill a Mockingbird",
    author: ["Harper Lee"],
    genres: ["Fiction"],
    publishDate: "1960",
    price: "13.99",
    rating: 4.8,
    description:
      "A powerful story about racial injustice and the loss of innocence in the American South.",
  },
  {
    bookId: "8",
    title: "The Catcher in the Rye",
    author: ["J.D. Salinger"],
    genres: ["Fiction"],
    publishDate: "1951",
    price: "11.99",
    rating: 4.1,
    description:
      "A classic novel of teenage alienation and rebellion in post-war America.",
  },
  {
    bookId: "9",
    title: "The Name of the Wind",
    author: ["Patrick Rothfuss"],
    genres: ["Fantasy"],
    publishDate: "2007",
    price: "18.99",
    rating: 4.9,
    description:
      "An intricate fantasy following the life of Kvothe, a legendary musician and magician.",
  },
  {
    bookId: "10",
    title: "Project Hail Mary",
    author: ["Andy Weir"],
    genres: ["Science Fiction"],
    publishDate: "2021",
    price: "24.99",
    rating: 4.8,
    description:
      "An astronaut wakes up alone on a spacecraft with no memory of how he got there.",
  },
  {
    bookId: "11",
    title: "The Silent Patient",
    author: ["Alex Michaelides"],
    genres: ["Mystery"],
    publishDate: "2019",
    price: "16.99",
    rating: 4.5,
    description:
      "A psychological thriller about a woman who shoots her husband and then never speaks again.",
  },
  {
    bookId: "12",
    title: "The Seven Husbands of Evelyn Hugo",
    author: ["Taylor Jenkins Reid"],
    genres: ["Fiction"],
    publishDate: "2017",
    price: "15.99",
    rating: 4.7,
    description:
      "A reclusive Hollywood legend reveals her life story to an unknown journalist.",
  },
  {
    bookId: "13",
    title: "Atomic Habits",
    author: ["James Clear"],
    genres: ["Non-Fiction"],
    publishDate: "2018",
    price: "21.99",
    rating: 4.9,
    description:
      "A practical guide to breaking bad habits and building good ones.",
  },
  {
    bookId: "14",
    title: "The Midnight Library",
    author: ["Matt Haig"],
    genres: ["Fiction"],
    publishDate: "2020",
    price: "17.99",
    rating: 4.4,
    description:
      "Between life and death, a library exists where one can try out different versions of their life.",
  },
  {
    bookId: "15",
    title: "Sapiens",
    author: ["Yuval Noah Harari"],
    genres: ["Non-Fiction"],
    publishDate: "2011",
    price: "22.99",
    rating: 4.7,
    description:
      "A brief history of humankind, from ancient humans to the present day.",
  },
];

export const genres = [
  "All Genres",
  "Fiction",
  "Romance",
  "Fantasy",
  "Young Adult",
  "Contemporary",
  "Nonfiction",
  "Adult",
  "Novels",
  "Historical Fiction",
  "Mystery",
];

export const years = [
  "All Years",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "Before 2015",
];

export const ratings = [
  "All Ratings",
  "4.5 & up",
  "4.0 & up",
  "3.5 & up",
  "3.0 & up",
];

export const priceRanges = [
  "All Prices",
  "Under $5",
  "$5 - $10",
  "$10 - $20",
  "$20 - $30",
  "Over $30",
];

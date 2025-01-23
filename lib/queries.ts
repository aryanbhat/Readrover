import { gql } from "@apollo/client";

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String, $filters: Filters, $from: Int, $size: Int) {
    search(query: $query, filters: $filters, from: $from, size: $size) {
      books {
        bookId
        title
        author
        rating
        description
        genres
        publishDate
        coverImg
        price
      }
      total
      pages
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query getBookDetails($bookId: String) {
    bookDetails(bookId: $bookId) {
      bookId
      title
      author
      rating
      description
      language
      isbn
      genres
      pages
      publisher
      publishDate
      awards
      numRatings
      likedPercent
      coverImg
      price
    }
  }
`;

export const AUTOCOMPLETE_SEARCH = gql`
  query AutocompleteSearch($query: String, $size: Int) {
    search(query: $query, size: $size) {
      books {
        title
        author
      }
    }
  }
`;

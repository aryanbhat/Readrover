import { gql } from "@apollo/client";

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String, $from: Int, $size: Int) {
    search(query: $query, from: $from, size: $size) {
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
  }
`;

export const GET_BOOKS_COUNT = gql`
  query GetBooksCount($query: String, $size: Int) {
    countDocs(query: $query, size: $size) {
      total
      pages
    }
  }
`;

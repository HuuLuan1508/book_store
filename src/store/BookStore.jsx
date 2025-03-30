import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allBooks } from "../services/BookAPI";

export const useAllBooksStore = create(
  persist(
    (set) => ({
      books: [],
      fetchBooks: async () => {
        const data = await allBooks();
        set({ books: data });
      },
    }),
    {
      name: "all-books",
    }
  )
);

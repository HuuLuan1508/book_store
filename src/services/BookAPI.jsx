import {usersAPI} from "../services/UserAPI";

const booksAPI = 'http://localhost:3000/books';
const updateRedChapterAPI = `${usersAPI}/`;
const updateFavoriteBooksAPI = `${usersAPI}/`;

export const allBooks = async () => {
  try {
    const response = await fetch(booksAPI);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateRedChapters = async (userId, redChapters) => {
  try {
    const response = await fetch(`${updateRedChapterAPI}${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({redBooks: redChapters}),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateFavoriteBooks = async (userId, favoriteBookIds) => {
  try {
    const response = await fetch(`${updateFavoriteBooksAPI}${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({favoriteBookIds: favoriteBookIds}),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
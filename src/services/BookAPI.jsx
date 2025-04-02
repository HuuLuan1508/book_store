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
    console.error("Error updating red chapters:", error);
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
    console.error("Error updating favorite books:", error);
    throw error;
  }
};

export const deleteBookById = async (id) => {
  try {
    // Kiểm tra xem truyện có tồn tại không
    const checkResponse = await fetch(`${booksAPI}/${id}`);
    const book = await checkResponse.json();
    
    if (!book) {
      throw new Error("Truyện không tồn tại");
    }

    // Thực hiện xóa truyện
    const response = await fetch(`${booksAPI}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Không thể xóa truyện. Vui lòng thử lại sau.");
    }

    return true;
  } catch (error) {
    if (error.message === "Truyện không tồn tại") {
      throw error;
    }
    console.error("Error deleting book:", error);
    throw new Error("Không thể xóa truyện. Vui lòng thử lại sau.");
  }
};
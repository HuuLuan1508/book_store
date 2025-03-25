import {usersAPI} from "../services/UserAPI";

const getAllBooksAPI = 'http://localhost:3000/books'
const updateRedChapterAPI = `${usersAPI}/`;

export const allBooks = async () => {
  try {
    const response = await fetch(getAllBooksAPI)
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
      body: JSON.stringify({red: redChapters}),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
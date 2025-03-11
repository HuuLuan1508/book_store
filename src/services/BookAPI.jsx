const getAllBooksAPI = 'http://localhost:3000/books'

const allBooks = async () => {
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

export default allBooks;
const allBooks = async () => {
  try {
    const response = await fetch('/data.json'); // Đảm bảo đường dẫn này chính xác
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác
  }
};

export default allBooks;
  
async function allBooks() {
    try {
      const response = await fetch("data.json"); // Chờ tải dữ liệu JSON
      const data = await response.json(); // Chuyển đổi JSON thành Object
      return Array.isArray(data) ? data : []; // Đảm bảo luôn trả về một mảng
    } catch (error) {
      console.error("Lỗi khi đọc JSON:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }
  
export default allBooks;
  
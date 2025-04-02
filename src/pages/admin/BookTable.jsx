import { useEffect, useState } from "react";
import { useAllBooksStore } from "../../store/BookStore";
import { deleteBookById } from "../../services/BookAPI";

function BookTable() {
  const { books, fetchBooks } = useAllBooksStore();
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    publishedDate: "",
    chapters: []
  });

  const [newChapter, setNewChapter] = useState({
    title: "",
    content: "",
    publishedDate: ""
  });

  const [showChapterForm, setShowChapterForm] = useState(false);
  const [tempChapters, setTempChapters] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchData = async () => {
    if (!books || books.length === 0) {
      await fetchBooks();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, title) => {
    // Xác nhận trước khi xóa
    if (!window.confirm(`Bạn có chắc chắn muốn xóa truyện "${title}" không?`)) {
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      // Gọi API xóa truyện
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Không thể xóa truyện. Vui lòng thử lại sau. ${response.statusText}`);
      }

      await fetchBooks(); // Refresh danh sách sau khi xóa
      alert("Xóa truyện thành công!");
    } catch (error) {
      console.error("Error deleting book:", error);
      setDeleteError(error.message);
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddChapter = () => {
    if (newChapter.title && newChapter.content) {
      setTempChapters([...tempChapters, { ...newChapter }]);
      setNewChapter({
        title: "",
        content: "",
        publishedDate: ""
      });
    }
  };

  const handleAddBook = async () => {
    try {
      // Validate required fields
      if (!newBook.id || !newBook.title || !newBook.author || !newBook.category) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc (ID, tiêu đề, tác giả, thể loại)");
        return;
      }

      // Kiểm tra ID đã tồn tại chưa
      const checkResponse = await fetch(`http://localhost:3000/books/${newBook.id}`);
      if (checkResponse.ok) {
        alert("ID này đã tồn tại. Vui lòng chọn ID khác!");
        return;
      }

      const bookToAdd = {
        ...newBook,
        description: newBook.description || "",
        image: newBook.image || "",
        publishedDate: newBook.publishedDate || "",
        chapters: tempChapters,
        star: "0"
      };

      // Thêm truyện mới
      const addResponse = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookToAdd)
      });

      if (addResponse.ok) {
        // Reset forms
        setNewBook({
          id: "",
          title: "",
          author: "",
          category: "",
          description: "",
          image: "",
          publishedDate: "",
          chapters: []
        });
        setTempChapters([]);
        setShowChapterForm(false);
        await fetchBooks();
        alert("Thêm truyện thành công!");
      } else {
        throw new Error("Không thể thêm truyện. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert(error.message || "Có lỗi xảy ra khi thêm truyện!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách Truyện</h2>
      
      {/* Form thêm truyện */}
      <div className="mb-8 p-4 border rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Thêm Truyện Mới</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="ID truyện *"
            value={newBook.id}
            onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
            className="border p-2 rounded"
            min="1"
          />
          <input
            type="text"
            placeholder="Tên truyện *"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Tác giả *"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Thể loại *"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Hình ảnh URL"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Ngày xuất bản"
            value={newBook.publishedDate}
            onChange={(e) => setNewBook({ ...newBook, publishedDate: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <textarea
          placeholder="Mô tả"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          className="border p-2 rounded w-full mb-4"
          rows="4"
        />

        {/* Danh sách chapter đã thêm */}
        {tempChapters.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Chapters đã thêm:</h4>
            <ul className="list-disc pl-5">
              {tempChapters.map((chapter, index) => (
                <li key={index}>{chapter.title}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form thêm chapter */}
        <button
          onClick={() => setShowChapterForm(!showChapterForm)}
          className="bg-gray-500 text-white p-2 rounded mb-4"
        >
          {showChapterForm ? "Ẩn form thêm chapter" : "Thêm chapter"}
        </button>

        {showChapterForm && (
          <div className="border p-4 rounded mb-4">
            <h4 className="font-semibold mb-2">Thêm Chapter</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Tên chapter"
                value={newChapter.title}
                onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Ngày xuất bản"
                value={newChapter.publishedDate}
                onChange={(e) => setNewChapter({ ...newChapter, publishedDate: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="Nội dung chapter"
              value={newChapter.content}
              onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
              className="border p-2 rounded w-full mb-4"
              rows="4"
            />
            <button
              onClick={handleAddChapter}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Thêm Chapter
            </button>
          </div>
        )}

        <button
          onClick={handleAddBook}
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Thêm Truyện
        </button>
      </div>

      {/* Hiển thị lỗi xóa nếu có */}
      {deleteError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {deleteError}
        </div>
      )}

      {/* Bảng danh sách truyện */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên truyện</th>
            <th className="border p-2">Tác giả</th>
            <th className="border p-2">Thể loại</th>
            <th className="border p-2">Số chapter</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.category}</td>
              <td className="border p-2">{book.chapters ? book.chapters.length : 0}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(book.id, book.title)}
                  disabled={isDeleting}
                  className={`text-white px-3 py-1 rounded ${
                    isDeleting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {isDeleting ? "Đang xóa..." : "Xóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
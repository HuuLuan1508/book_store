import { useEffect } from "react";
import { useAllBooksStore } from "../../store/BookStore";
import { deleteBookById } from "../../services/BookAPI";

function BookTable() {
  const { books, fetchBooks } = useAllBooksStore();

  const fetchData = async () => {
    if (!books || books.length == 0) {
      await fetchBooks();
    }
  };

  useEffect(() => {
    fetchData();
    console.log(books);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBookById(Number(id));
      await fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách Truyện</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên truyện</th>
            <th className="border p-2">Tác giả</th>
            <th className="border p-2">Thể loại</th>
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
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500"
                >
                  Xóa
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

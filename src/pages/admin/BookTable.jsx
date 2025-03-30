import { useState } from "react";
import Modal from "../admin/Modal";

const sampleBooks = [
  { id: 1, title: "One Piece", author: "Eiichiro Oda", chapters: 1100 },
  { id: 2, title: "Naruto", author: "Masashi Kishimoto", chapters: 700 },
];

function BookTable() {
  const [books, setBooks] = useState(sampleBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách Truyện</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên Truyện</th>
            <th className="border p-2">Tác Giả</th>
            <th className="border p-2">Số Chương</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="text-center">
              <td className="border p-2">{book.id}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.chapters}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(book)} className="text-blue-500 mr-2">Sửa</button>
                <button onClick={() => handleDelete(book.id)} className="text-red-500">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && <Modal book={selectedBook} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default BookTable;

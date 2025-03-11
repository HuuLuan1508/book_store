import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    setMyBooks(storedBooks);
  }, []);

  const updateProgress = (bookId, newProgress) => {
    const updatedBooks = myBooks.map((book) => {
      if (book.id === bookId) {
        const currentProgress =
          typeof book.progress === "number" ? book.progress : 0;
        const updatedProgress = Math.min(currentProgress + newProgress, 100);
        return { ...book, progress: updatedProgress };
      }
      return book;
    });
    setMyBooks(updatedBooks);
    localStorage.setItem("myBooks", JSON.stringify(updatedBooks));
  };

  const deleteBook = (bookId) => {
    const updatedBooks = myBooks.filter((book) => book.id !== bookId);
    setMyBooks(updatedBooks);
    localStorage.setItem("myBooks", JSON.stringify(updatedBooks));
  };

  const handleBookClick = (book) => {
    navigate("/viewbook", { state: { book } });
  };

  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold dark:text-white">History Read</h1>
            <a href="#" className="text-blue-500 hover:underline">
              See all
            </a>
          </div>

          <div className="space-y-4">
            {myBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={book.image}
                    alt={book.title}
                  />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Đọc tiếp Chapter {Math.ceil(book.progress / 10)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBook(book.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <span className="font-bold">Xóa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;

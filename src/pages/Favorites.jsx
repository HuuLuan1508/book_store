import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const deleteBook = (bookId) => {
    const updatedBooks = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedBooks);
    localStorage.setItem("favorites", JSON.stringify(updatedBooks));
  };

  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            My Favorites
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((book) => (
              <div
                className="border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                onClick={() => navigate("/viewbook", { state: { book } })}
              >
                <img
                  className="w-[280px] h-[420px] object-cover rounded-t-lg"
                  src={book.image}
                  alt={book.title}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-blue-500 hover:text-blue-600">
                      Read Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBook(book.id);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#EA3323"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;

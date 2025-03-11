import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (book) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((fav) => fav.id === book.id)) {
      storedFavorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      setFavorites(storedFavorites); // Cập nhật state
    }
  };

  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">My Favorites</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((book) => (
              <Link key={book.id} to="/viewbook" state={{ book: book }}>
                <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img
                    className="w-[280px] h-auto object-cover rounded-t-lg"
                    src={book.image}
                    alt={book.title}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p className="text-gray-600">by {book.author}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-blue-500 hover:text-blue-600">Read Now</button>
                      <button
                        onClick={() => handleAddToFavorites(book)} // Gọi hàm khi nhấn nút
                        className="text-green-500 hover:text-green-600"
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites; 
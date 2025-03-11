import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Viewbook() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("Book:", book);
    if (!book) {
      navigate("/");
    } else {
      // Kiểm tra xem sách đã được yêu thích chưa
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isBookFavorite = favorites.some((fav) => fav.id === book.id);
      setIsFavorite(isBookFavorite);
    }
  }, [book, navigate]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      // Nếu đã yêu thích, xóa khỏi danh sách yêu thích
      const updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Nếu chưa yêu thích, thêm vào danh sách yêu thích
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToLibrary = () => {
    // Thêm sách vào MyBookshelf
    const myBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
    if (!myBooks.some((b) => b.id === book.id)) {
      myBooks.push(book);
      localStorage.setItem("myBooks", JSON.stringify(myBooks));
    }
    // Chuyển hướng đến MyBookshelf
    navigate("/mybookshelf");
  };

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto mt-10 p-5 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              className="w-[300px] h-auto object-cover rounded-lg shadow-md"
              src={book.image}
              alt={book.title}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold dark:text-white">
                {book.title}
              </h1>
              <button
                onClick={handleToggleFavorite}
                className={`transition-colors ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                } hover:text-red-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 -960 960 960"
                  width="32"
                  fill="currentColor"
                >
                  <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                </svg>
              </button>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              by Rieko Hinata
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                Details
              </h2>
              <ul className="text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-medium">Publisher:</span> Example
                  Publishing
                </li>
                <li>
                  <span className="font-medium">Publication Date:</span> 2024
                </li>
                <li>
                  <span className="font-medium">Pages:</span> 200
                </li>
                <li>
                  <span className="font-medium">Language:</span> English
                </li>
                <li>
                  <span className="font-medium">Genre:</span> Fantasy
                </li>
              </ul>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Read Now
              </button>
              <button
                onClick={handleAddToLibrary} // Gọi hàm khi nhấn nút
                className="border border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-50"
              >
                Add to Library
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {book.chapters &&
              book.chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold dark:text-white">
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated: {chapter.publishedDate}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const chapterIndex = index + 1;
                        console.log(
                          `Navigating to /read/${book.id}/${chapterIndex}`
                        );
                        navigate(`/read/${book.id}/${chapterIndex}`);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Read
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

export default Viewbook;
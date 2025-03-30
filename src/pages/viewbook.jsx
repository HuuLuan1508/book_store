import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateFavoriteBooks, updateRedChapters } from "../services/BookAPI";
import { useUserStore } from "../store/UserStore";

function ViewBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [isFavorite, setIsFavorite] = useState(null);
  const [readChapters, setReadChapters] = useState([]);
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (!book) {
      navigate("/");
    } else {
      setFavoriteState();

      const userReadHistory = user.redBooks.find(
        (item) => Number(item.bookId) === Number(book.id)
      );

      if (userReadHistory) {
        setReadChapters(userReadHistory.chapters);
      }
    }
  }, [book, navigate, user]);

  const setFavoriteState = () => {
    const favoriteIds = user.favoriteBookIds;
    setIsFavorite(favoriteIds.some((id) => Number(id) === Number(book.id)));
  };

  // Đánh dấu chương đã đọc
  const markChapterAsRead = async (chapterIndex) => {
    const updatedUser = { ...user }; // Sao chép user để chỉnh sửa
    let bookIndex = updatedUser.redBooks.findIndex(
      (b) => Number(b.bookId) === Number(book.id)
    );

    if (bookIndex !== -1) {
      // Kiểm tra xem chương đã tồn tại trong danh sách chưa
      if (!updatedUser.redBooks[bookIndex].chapters.includes(chapterIndex)) {
        updatedUser.redBooks[bookIndex].chapters.push(chapterIndex);
      }
    } else {
      // Nếu sách chưa có trong danh sách đọc, thêm mới
      updatedUser.redBooks.push({ bookId: book.id, chapters: [chapterIndex] });
    }

    await updateRedChapters(user.id, updatedUser.redBooks);

    await fetchUser(user.id);

    setReadChapters(
      user.redBooks.find((b) => Number(b.bookId) === Number(book.id)).chapters
    );
  };

  const updateFavoriteState = async () => {
    var updatedFavorites = [];

    if (isFavorite) {
      // Nếu đã yêu thích, xóa sách khỏi danh sách
      updatedFavorites = user.favoriteBookIds.filter((id) => Number(id) !== Number(book.id));
    } else {
      // Nếu chưa yêu thích, thêm sách vào danh sách
      updatedFavorites = [...(user.favoriteBookIds), Number(book.id)];
    }

    await updateFavoriteBooks(user.id, updatedFavorites);

    await fetchUser(user.id);
  };

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
                onClick={updateFavoriteState}
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
              by {book.author}
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                Giới thiệu:
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {book.description}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                Đọc ngay
              </button>
            </div>
          </div>
        </div>

        {/* Hiển thị danh sách chương */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {book.chapters &&
              book.chapters.map((chapter, index) => {
                const chapterIndex = index + 1;
                const isRead = readChapters.includes(chapterIndex);

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors 
                      ${
                        isRead
                          ? "bg-green-200 dark:bg-green-700"
                          : "dark:hover:bg-gray-700"
                      }`}
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
                        onClick={async () => {
                          await markChapterAsRead(chapterIndex);
                          navigate(`/read/${book.id}/${chapterIndex}`);
                        }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Read {isRead && "✔️"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;

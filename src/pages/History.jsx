import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRedChapters } from "../services/BookAPI";
import {useUserStore} from "../store/UserStore";
import {useAllBooksStore} from "../store/BookStore";

function History() {
  const [redBooks, setRedBooks] = useState([]);
  const {user, fetchUser} = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {books} = useAllBooksStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`User lấy từ store:`);
    console.log(user);

    if (!user) {
      setIsLoggedIn(false);
      return;
    }

    const fetchHistory = async () => {
      if (isLoggedIn) {
        const redBooks = user.redBooks.map((e) => {
          const book = [...books].find((book) => Number(book.id) == Number(e.bookId));
          return {
            ...book,
            chaptersRead: e.chapters
          };
        });
      
        console.log("Danh sách sách đã đọc:", redBooks);
        setRedBooks(redBooks);
      }
    };

    fetchHistory();
  }, [user, isLoggedIn]);

  const handleDeleteHistory = async (bookId, event) => {
    event.stopPropagation();

    try {
      const updatedRed = user.redBooks.filter(
        (book) => Number(book.bookId) !== Number(bookId)
      );

      await updateRedChapters(user.id, updatedRed);

      await fetchUser(user.id);

      const redBooks = user.redBooks.map((e) => {
        const book = [...books].find((book) => Number(book.id) == Number(e.bookId));
        return {
          ...book,
          chaptersRead: e.chapters
        };
      });

      setRedBooks(redBooks);
    } catch (error) {
      console.error("Lỗi khi xóa lịch sử đọc:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {isLoggedIn ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-white">
                  History Read
                </h1>
              </div>

              <div className="space-y-4">
                {redBooks.length > 0 ? (
                  redBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => navigate("/viewbook", { state: { book } })}
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
                            Đọc tiếp Chapter {Math.max(...book.chaptersRead)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => handleDeleteHistory(book.id, e)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <span className="font-bold">Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Bạn chưa đọc truyện nào.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                Bạn chưa đăng nhập!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Vui lòng đăng nhập để xem lịch sử đọc truyện của bạn.
              </p>
              <button
                onClick={handleLoginRedirect}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
              >
                Đăng nhập ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import allBooks from "../functions";

function ReadChapter() {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState(null);
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await allBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]); 

  useEffect(() => {
    if (!books) return;
    setChapter(null);

    const currentBook = books.find((b) => parseInt(b.id) === parseInt(bookId));

    if (currentBook && currentBook.chapters) {
      setBook(currentBook);
      const chapterIndex = parseInt(chapterId) - 1;
      const currentChapter = currentBook.chapters[chapterIndex];

      if (currentChapter) {
        setChapter(currentChapter);
      } else {
        console.error("Chapter not found");
        navigate("/");
      }
    } else {
      console.error("Book or chapters not found");
      navigate("/");
    }
  }, [bookId, chapterId, books, navigate]);

  if (!chapter || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-gray-800 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {chapter.title}
          </h2>
        </div>

        <div key={chapterId} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center gap-4">
            {chapter.contents &&
              chapter.contents.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Page ${index + 1}`}
                  className="max-w-full h-auto"
                  loading="lazy"
                />
              ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() =>
              navigate(`/read/${bookId}/${parseInt(chapterId) - 1}`)
            }
            disabled={parseInt(chapterId) <= 1}
            className={`px-6 py-2 rounded-md ${
              parseInt(chapterId) <= 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Previous Chapter
          </button>
          <button
            onClick={() => {
              const nextChapterId = parseInt(chapterId) + 1;
              if (nextChapterId <= book.chapters.length) {
                navigate(`/read/${bookId}/${nextChapterId}`);
              } else {
                console.log("No more chapters available");
              }
            }}
            disabled={parseInt(chapterId) >= book.chapters.length}
            className={`px-6 py-2 rounded-md ${
              parseInt(chapterId) >= book.chapters.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReadChapter;

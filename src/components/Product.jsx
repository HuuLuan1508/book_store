import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import allBooks from "../functions";

function Product() {
  const [selectedSort, setSelectedSort] = useState("Lates Addef");
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    setIsOpen(false);
  };

  const [books, setBooks] = useState([]); // Đặt books là một mảng rỗng ban đầu

  useEffect(() => {
    async function fetchBooks() {
      const data = await allBooks(); // Gọi hàm lấy dữ liệu
      setBooks(data); // Cập nhật state với danh sách sách
    }
    fetchBooks();
  }, []);

  console.log(books);

  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 grid grid-cols-1 w-full h-full relative z-[1]">
      <div className="bg-white dark:bg-gray-800 w-full container mx-auto mt-[50px] col-span-1 rounded-[5px] border border-gray-200 shadow-lg">
        <div className="ms-3 me-3 px-4 bg-[#FFFFFF] mt-4 rounded-[5px] flex flex-col items-center py-4 border border-gray-200 shadow-lg mb-3">
          <p className="mb-5 self-start text-left">Browse Books</p>

          {/* Đảm bảo input full chiều rộng của div */}
          <div className="relative w-full z-[1]">
            {/* Icon Tìm kiếm */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>

            {/* Input full width */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-10 py-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg dark:bg-gray-700 dark:text-white"
            />

            {/* Icon Mic (bên phải input) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Z" />
            </svg>
          </div>
          <p className="mb-2 self-start text-left mt-5">Filter by Genre</p>
          <div className="self-start justify-start flex gap-4 mt-5 list-none">
            <a
              className="boder rounded-[5px] bg-[#F3F4F6] p-1 ps-2 pe-2 "
              href=""
            >
              Action
            </a>
            <a
              className="boder rounded-[5px] bg-[#F3F4F6] p-1 ps-2 pe-2 "
              href=""
            >
              Romance
            </a>
            <a
              className="boder rounded-[5px] bg-[#F3F4F6] p-1 ps-2 pe-2 "
              href=""
            >
              Comedy
            </a>
            <a
              className="boder rounded-[5px] bg-[#F3F4F6] p-1 ps-2 pe-2 "
              href=""
            >
              Fantasy
            </a>
            <a
              className="boder rounded-[5px] bg-[#F3F4F6] p-1 ps-2 pe-2 "
              href=""
            >
              Slice of Life
            </a>
          </div>
          <p className="mb-2 self-start text-left mt-5">Filter by Rating</p>
          <div className="self-start justify-start flex gap-5 mt-5 list-none">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
            </a>
            <a className="flex " href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
            </a>
            <a className="flex " href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
            </a>
            <a className="flex " href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EA3323"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
              </svg>
            </a>
          </div>
          <div className="mt-5 self-start justify-start flex items-center gap-4">
            <p className="">Sort Books By</p>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="border rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200"
              >
                {selectedSort}
              </button>
              {isOpen && (
                <ul className="absolute bg-white border border-gray-200 shadow-md rounded-md mt-2 w-full">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("Lates Addef")}
                  >
                    Lates Addef
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("Highest Rated")}
                  >
                    Highest Rated
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("Title A-Z")}
                  >
                    Title A-Z
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 h-auto justify-center gap-2 mt-5">
          {books.map((book, index) => (
            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3 list-none flex justify-center mt-3">
              <li className="h-auto w-auto border shadow-lg rounded-[5px] hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link to="/viewbook" state={{ book }}>
                  <img
                    className="w-[280px] object-cover h-auto rounded-tl-[5px] rounded-tr-[5px]"
                    src={book.image}
                    alt={book.title}
                  />
                  <p className="mt-3 text-center">{book.title}</p>
                  <p className="mt-1 text-center">by {book.author}</p>
                </Link>
              </li>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 justify-center mt-5 mb-5">
          {/* Nút Previous */}
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-gray-500 hover:bg-gray-100">
            ❮
          </button>

          {/* Số trang */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 text-white shadow-md">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-gray-700 hover:bg-gray-100">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-gray-700 hover:bg-gray-100">
            3
          </button>

          {/* Nút Next */}
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg text-gray-500 hover:bg-gray-100">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}
export default Product;

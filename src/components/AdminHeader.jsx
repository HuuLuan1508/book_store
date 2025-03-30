import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {useUserStore} from "../store/UserStore";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const {user, setUser} = useUserStore();

  // Hàm xử lý chuyển đổi theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    // Thêm/xóa class dark vào thẻ html
    document.documentElement.classList.toggle("dark");
    // Lưu preference vào localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Khởi tạo theme từ localStorage khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate('/'); // Khi logout, tự động về trang chủ
    }
  }, [user]);

  // Style cho menu item khi active
  const activeStyle = "text-blue-600 font-medium";
  const normalStyle = "text-gray-700";

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className="shadow-md p-4 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-500 shadow-gray-500 z-[9999]">
      <div className="relative container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-semibold text-blue-600 dark:text-white flex items-center gap-2"
          >
            <svg
              className="fill-[#4E6FCF] dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              height="auto"
              viewBox="0 -960 960 960"
              width="50px"
            >
              <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
            </svg>
            StoryStack
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-gray-700 dark:text-white absolute right-4 top-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>

        {/* Menu Items */}
        {/* <div
          className={`lg:flex gap-[50px] justify-center bg-white dark:bg-gray-800 ${
            isOpen ? "block" : "hidden"
          } fixed lg:static top-[72px] right-0 left-0 shadow-md lg:shadow-none p-4 lg:p-0 w-full lg:w-auto`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-white"
              }`
            }
            end
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            Home
          </NavLink>
          <NavLink
            to="/mybookshelf"
            className={({ isActive }) =>
              `flex md:mt-0 mt-3 items-center gap-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-white"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
            </svg>
            History
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex md:mt-0 mt-3 items-center gap-1 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-white"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
            Favorites
          </NavLink>
        </div> */}

        {/* Action Buttons */}
        <div className="lg:flex gap-5 items-center hidden">
          <button
            onClick={toggleTheme}
            className="border rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                className="text-white"
              >
                <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
              </svg>
            )}
          </button>
          {user ? (
            <Link
              onClick={handleLogout}
              className="flex gap-2 items-center text-gray-700 dark:text-white hover:text-red-600 dark:hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
              </svg>
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex gap-2 items-center text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;

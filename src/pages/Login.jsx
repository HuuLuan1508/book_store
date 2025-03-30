import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersByEmail } from "../services/UserAPI";
import { useUserStore } from "../store/UserStore";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const { user, setUser, fetchUser } = useUserStore();

  const validateForm = () => {
    let validateEmail = "";
    let validatePassword = "";

    if (!email) {
      validateEmail = "Vui lòng nhập email!";
    } else if (!email.endsWith("@gmail.com")) {
      validateEmail = "Email không hợp lệ!";
    }

    if (!password) {
      validatePassword = "Vui lòng nhập mật khẩu!";
    } else if (password.length < 6) {
      validatePassword = "Mật khẩu phải từ 6 kí tự trở lên!";
    }

    setErrors({ email: validateEmail, password: validatePassword });

    return !validateEmail && !validatePassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    setSuccessMessage("");

    const isValid = validateForm();
    if (!isValid) return;

    try {
      if (isValid) {
        const users = await getUsersByEmail(email);

        if (!users || users.length === 0) {
          setErrors({ email: "Tài khoản không tồn tại!", password: "" });
          return;
        }
    
        const loggedInUser = users[0];
    
        if (loggedInUser.password !== password) {
          setErrors({ email: "", password: "Mật khẩu không chính xác!" });
          return;
        }
    
        setUser(loggedInUser); // Cập nhật thông tin người dùng vào Zustand
    
        if (loggedInUser.role === "ADMIN") {
          navigate("/management"); // Nếu là ADMIN, chuyển hướng tới trang quản lý
        } else {
          navigate("/"); // Nếu là user thường, chuyển hướng về trang chủ
        }
    
        alert("Đăng nhập thành công!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-4">
          Đăng Nhập
        </h2>
        {successMessage && (
          <p className="text-green-500 text-center font-semibold mb-4">
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

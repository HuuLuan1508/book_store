import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    // Kiểm tra email
    if (!email) {
      tempErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!email.endsWith("@gmail.com")) {
      tempErrors.email = "Email không hợp lệ!";
      isValid = false;
    }

    // Kiểm tra password
    if (!password) {
      tempErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-4">
          Đăng Nhập
        </h2>
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-blue-500 dark:text-blue-400 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng Nhập
          </button>
          
          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-300">Chưa có tài khoản? </span>
            <Link to="/register" className="text-blue-500 dark:text-blue-400 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerNewAccount } from "../services/UserAPI";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  const [message, setMessage] = useState({ type: "", content: "" });

  const validateForm = () => {

    var validateUsername = "";
    var validateEmail = "";
    var validatePassword = "";
    var validateConfirm = "";

    if (!formData.username.trim()) {
      validateUsername = "Vui lòng nhập tên người dùng!";
    }

    if (!formData.email) {
      validateEmail = "Vui lòng nhập email";
    } else if (!formData.email.endsWith("@gmail.com")) {
      validateEmail = "Email không hợp lệ!";
    }

    if (!formData.password) {
      validatePassword = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      validatePassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      validateConfirm = "Vui lòng xác nhận mật khẩu";
    } else if (formData.confirmPassword !== formData.password) {
      validateConfirm = "Mật khẩu không khớp";
    }

    setErrors({username: validateUsername, email: validateEmail, password: validatePassword, confirmPassword: validateConfirm});

    if (!validateUsername && !validateEmail && !validatePassword && !validateConfirm){
      return true;
    }

    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const newUser = await registerNewAccount(formData.username, formData.email, formData.password);
        setMessage({
          type: "success",
          content: "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập..."
        });
        // Đợi 2 giây trước khi chuyển hướng
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (e) {
        setMessage({
          type: "error",
          content: "Đăng ký thất bại! Vui lòng thử lại sau."
        });
        console.log(e);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {message.content && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.content}
          </div>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-4">
          Đăng Ký Tài Khoản
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Username field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Tên người dùng
            </label>
            <input
              type="text"
              name="username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="Nhập tên người dùng"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng Ký
          </button>

          {/* Login link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-300">Đã có tài khoản? </span>
            <Link to="/login" className="text-blue-500 dark:text-blue-400 hover:underline">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register; 
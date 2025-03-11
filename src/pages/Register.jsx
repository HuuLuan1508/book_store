import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const validateForm = () => {
    let tempErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: ""
    };
    let isValid = true;

    // Kiểm tra username
    if (!formData.username.trim()) {
      tempErrors.username = "Vui lòng nhập tên người dùng";
      isValid = false;
    }

    // Kiểm tra email
    if (!formData.email) {
      tempErrors.email = "Vui lòng nhập email";
      isValid = false;
    } else if (!formData.email.endsWith("@gmail.com")) {
      tempErrors.email = "Email không hợp lệ!";
      isValid = false;
    }

    // Kiểm tra password
    if (!formData.password) {
      tempErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    // Kiểm tra confirm password
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Mật khẩu không khớp";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Xử lý đăng ký ở đây
      console.log("Form is valid", formData);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
import { useState } from "react";
import BookTable from "../admin/BookTable";
import UserTable from "../admin/UserTable";

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("books");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Tab menu */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${selectedTab === "books" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedTab("books")}
          >
            Quản lý Truyện
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${selectedTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedTab("users")}
          >
            Quản lý Người Dùng
          </button>
        </div>

        {/* Render theo tab */}
        {selectedTab === "books" ? <BookTable /> : <UserTable />}
      </div>
    </div>
  );
}

export default AdminDashboard;

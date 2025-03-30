import { useEffect, useState } from "react";
import { useAllUsersStore } from "../../store/UserStore";
import { deleteUserById } from "../../services/UserAPI";

function UserTable() {
  const { users, fetchAllUsers } = useAllUsersStore();

  useEffect(() => {
    fetchData();
    console.log(users);
  }, []);

  const fetchData = async () => {
    if (!users || users.length == 0) {
      await fetchAllUsers();
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      await fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách Người Dùng</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {user.role === "USER" && (
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500"
                  >
                    Xóa
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;

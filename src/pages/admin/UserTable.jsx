import { useState } from "react";

const sampleUsers = [
  { id: 1, name: "Admin", email: "admin@example.com" },
  { id: 2, name: "User123", email: "user123@example.com" },
];

function UserTable() {
  const [users, setUsers] = useState(sampleUsers);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(user.id)} className="text-red-500">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;

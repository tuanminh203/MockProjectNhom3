import "../../styles/UserManagement.css";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();

  const users = [
    { id: 1, username: "admin", fullname: "Nguyen Van A", email: "admin@gmail.com", phone_number: "0123456789", role: "ADMIN", status: "ACTIVE", address: "Hà Nội", date_of_birth: "1990-01-01" },
    { id: 2, username: "user01", fullname: "Tran Thi B", email: "user01@gmail.com", phone_number: "0987654321", role: "USER", status: "ACTIVE", address: "HCM", date_of_birth: "1995-05-20" },
  ];

  return (
    <div className="user-management">
      <h2>Quản lý người dùng</h2>
      <button className="add-btn" onClick={() => navigate("/admin/users/add")}>
        ➕ Thêm User
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Fullname</th><th>Email</th>
            <th>Phone</th><th>Role</th><th>Status</th>
            <th>Address</th><th>Date of Birth</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.username}</td><td>{u.fullname}</td>
              <td>{u.email}</td><td>{u.phone_number}</td>
              <td>{u.role}</td><td>{u.status}</td>
              <td>{u.address}</td><td>{u.date_of_birth}</td>
              <td>
                <button className="edit-btn" onClick={() => navigate(`/admin/users/edit/${u.id}`)}>✏️</button>
                <button className="delete-btn" onClick={() => navigate(`/admin/users/delete/${u.id}`)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
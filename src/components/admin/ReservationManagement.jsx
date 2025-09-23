import "../../styles/ReservationManagement.css";

export default function ReservationManagement() {
  const reservations = [
    { id: 1, user_id: 2, table_id: 5, reservation_time: "19:00", reservation_date: "2025-09-23", num_people: 4, status: "CONFIRMED" },
  ];

  const handleEdit = (id) => {
    alert(`Sửa đặt bàn ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa đặt bàn ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Thêm đặt bàn mới");
  };

  return (
    <div className="reservation-management">
      <h2>Quản lý đặt bàn</h2>
      <button className="add-btn" onClick={handleAdd}>➕ Thêm đặt bàn</button>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>ID</th><th>User ID</th><th>Table ID</th><th>Time</th>
            <th>Date</th><th>People</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td><td>{r.user_id}</td><td>{r.table_id}</td>
              <td>{r.reservation_time}</td><td>{r.reservation_date}</td>
              <td>{r.num_people}</td><td>{r.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(r.id)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(r.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

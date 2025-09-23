import "../../styles/Dashboard.css";

export default function Dashboard() {
  // sau này có thể gọi API để lấy số liệu thật
  const stats = [
    { id: 1, label: "Người dùng", value: 120, icon: "👥", color: "#3498db" },
    { id: 2, label: "Đặt bàn hôm nay", value: 35, icon: "📅", color: "#2ecc71" },
    { id: 3, label: "Món trong menu", value: 58, icon: "🍽️", color: "#e67e22" },
    { id: 4, label: "Đơn hủy", value: 5, icon: "❌", color: "#e74c3c" },
  ];

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.id} className="stat-card" style={{ background: s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Tablebooking.css";

export default function TableBooking() {
  const { id } = useParams(); // lấy số bàn từ URL
  const navigate = useNavigate();

  const [soNguoi, setSoNguoi] = useState(1);
  const [thoiGian, setThoiGian] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đặt bàn ${id} cho ${soNguoi} người, lúc ${thoiGian}`);
    navigate("/tables"); // quay lại danh sách sau khi đặt
  };

  return (
    <div className="booking-container">
      <h2 className="page-title">Bàn số {id}</h2>

      <div className="card">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <label className="form-label">Số lượng người</label>
            <select
              className="input select"
              value={soNguoi}
              onChange={(e) => setSoNguoi(e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Thời gian</label>
            <input
              className="input datetime-input"
              type="datetime-local"
              value={thoiGian}
              onChange={(e) => setThoiGian(e.target.value)}
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Đặt bàn</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/tables")}>
              Thoát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

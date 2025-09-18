import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: xử lý logic đăng ký (gọi API)
    alert("Đăng ký thành công!");

    // Sau khi đăng ký xong → quay về trang đăng nhập
    navigate("/sign-in");
  };

  return (
    <section className="register-container">
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" placeholder="Nhập họ tên" required />
        </div>

        <div className="form-group">
          <label>Ngày sinh</label>
          <input type="date" required />
        </div>

        
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" required />
        </div>

        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input type="password" placeholder="Nhập lại mật khẩu" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Nhập email" required />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="tel" placeholder="Nhập số điện thoại" required />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input type="address" placeholder="Nhập địa chỉ" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-register">
            Đăng Ký
          </button>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/sign-in")}
          >
            Quay lại
          </button>
        </div>
      </form>
    </section>
  );
}

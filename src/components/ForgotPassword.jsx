import "../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: gọi API gửi email reset mật khẩu
    alert("Yêu cầu đặt lại mật khẩu đã được gửi vào email của bạn!");

    // Sau khi gửi xong → chuyển sang trang nhập OTP
    navigate("/reset-password");
  };

  return (
    <section className="forgot-container">
      <h2>Quên Mật Khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nhập email</label>
          <input type="email" placeholder="Nhập email của bạn" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-send">
            Gửi yêu cầu
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

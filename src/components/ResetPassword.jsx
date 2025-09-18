import "../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    // TODO: gọi API xác thực OTP và cập nhật mật khẩu
    alert("Đặt lại mật khẩu thành công!");
    navigate("/sign-in");
  };

  return (
    <section className="reset-container">
      <h2>Đặt Lại Mật Khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Nhập mã OTP"
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        <div className="form-group">
          <label>Nhập lại mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-reset">
            Xác nhận
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

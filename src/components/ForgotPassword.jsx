import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api";
import "../styles/ForgotPassword.css"; // Tạo file CSS tương tự

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            alert("Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra email!");
            // Chuyển hướng đến trang đặt lại mật khẩu với email đã nhập
            navigate(`/reset-password?email=${email}`);
        } catch (err) {
            let errorMessage = "Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            alert(errorMessage);
        }
    };

    return (
        <section className="forgot-container">
            <h2>Quên Mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-send">
                    Gửi yêu cầu
                </button>
            </form>
            <div className="signin-links">
                <a href="/sign-in">Quay lại trang Đăng nhập</a>
            </div>
        </section>
    );
}
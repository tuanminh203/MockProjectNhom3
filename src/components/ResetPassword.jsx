import "../styles/ResetPassword.css";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  // Lấy email từ URL khi component được load
    useEffect(() => {
        const emailFromUrl = searchParams.get("email");
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        } else {
            alert("Không tìm thấy email. Vui lòng thử lại.");
            navigate("/forgot-password");
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            const requestBody = { email, otp, newPassword, confirmPassword };
            await resetPassword(requestBody);
            alert("Mật khẩu đã được đặt lại thành công! Vui lòng đăng nhập.");
            navigate("/sign-in");
        } catch (err) {
            let errorMessage = "Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại OTP và thử lại.";
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            }
            alert(errorMessage);
        }
    };


     return (
        <section className="reset-container">
            <h2>Đặt lại Mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <p className="email-display">{email}</p>
                </div>

                <div className="form-group">
                    <label>Mã OTP</label>
                    <input
                        type="text"
                        placeholder="Nhập mã OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-reset">
                    Đặt lại Mật khẩu
                </button>
            </form>
        </section>
    );
}

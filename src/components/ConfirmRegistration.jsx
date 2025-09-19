import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmRegistration } from "../api";
import "../styles/ConfirmRegistration.css";

export default function ConfirmRegistration() {
    const { email } = useParams(); 
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await confirmRegistration(email, otp);
            alert("Xác thực tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.");
            navigate("/sign-in");
        } catch (err) {
            let errorMessage = "Xác thực thất bại. Vui lòng thử lại.";
            if (err.response) {
                errorMessage = err.response.data.message || errorMessage;
            }
            alert(errorMessage);
        }
    };

    return (
        <section className="confirm-container">
            <h2>Xác thực tài khoản</h2>
            <p>Mã OTP đã được gửi đến email: <strong>{email}</strong></p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nhập mã OTP</label>
                    <input
                        type="text"
                        placeholder="Nhập mã OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-confirm">
                    Xác thực
                </button>
            </form>
        </section>
    );
}
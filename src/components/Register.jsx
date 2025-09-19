import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../api";

export default function Register() {
  const navigate = useNavigate();

  // Sử dụng state để lưu trữ dữ liệu form
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        dateOfBirth: "", 
        password: "",
        confirmPassword: "",
        email: "",
        phoneNumber: "",
        address: ""
    });

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu nhập lại
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        try {
            // Chuẩn bị dữ liệu cho API, chú ý tên các trường phải khớp với RegistrationRequest DTO của backend
            const registrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber, 
                address: formData.address,      
                birthDate: formData.dateOfBirth
            };
            
            // Gọi hàm API đăng ký
            await register(registrationData);
            
            alert("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
            navigate(`/confirm-registration/${formData.email}`);

        } catch (err) {
            let errorMessage = "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.";
            if (err.response) {
                if (err.response.status === 409) { 
                    errorMessage = "Tên đăng nhập hoặc Email đã tồn tại. Vui lòng chọn cái khác.";
                } else if (err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }
            alert(errorMessage);
        }
    };

  return (
 <section className="register-container">
            <h2>Đăng Ký Tài Khoản</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="text" name="username" placeholder="Nhập tên đăng nhập" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input type="text" name="fullName" placeholder="Nhập họ tên" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Nhập email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" placeholder="Nhập mật khẩu" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="tel" name="phoneNumber" placeholder="Nhập số điện thoại" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" placeholder="Nhập địa chỉ" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-register">Đăng Ký</button>
                    <button type="button" className="btn-back" onClick={() => navigate("/sign-in")}>Quay lại</button>
                </div>
            </form>
        </section>
  );
}

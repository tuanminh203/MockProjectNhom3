import "../styles/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { useState } from "react";
import { jwtDecode } from "jwt-decode"; // 👉 Import jwtDecode

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      console.log("JWT:", token);

      if (!token) {
        alert("Không nhận được token!");
        return;
      }
      
      // 👉 Giải mã JWT để lấy thông tin người dùng
      const decodedToken = jwtDecode(token);
      const user = decodedToken.sub;

      if (!user) {
        alert("Không tìm thấy tên người dùng trong token!");
        return;
      }

      // Lưu JWT và username vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", user); // 👉 Lưu username đã giải mã
      
      alert("Đăng nhập thành công!");
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err);
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <section className="signin-container">
      <h2>Đăng Nhập Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-signin">
          Đăng Nhập
        </button>
      </form>

      <div className="signin-links">
        <Link to="/register">Đăng ký</Link>
        <Link to="/forgot-password">Quên mật khẩu</Link>
      </div>
    </section>
  );
}
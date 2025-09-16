import "../styles/Signin.css";
import { Link } from "react-router-dom";
import { login } from "../api"; // import hàm login
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      console.log("JWT:", token);

    if (!token) {
      alert("Không nhận được token!");
      return;
    }

      // Lưu JWT vào localStorage
      localStorage.setItem("token", token);
      alert("Đăng nhập thành công!");
    } catch (err) {
      console.error("Login failed:", err);
    alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <section className="signin-container">
      <h2>Đăng Nhập Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
  {/* Username */}
  <div className="form-group">
    <label>Tên đăng nhập</label>
    <input
      type="text"
      placeholder="Nhập tên đăng nhập"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>

  {/* Password */}
  <div className="form-group">
    <label>Mật khẩu</label>
    <input
      type="password"
      placeholder="Nhập mật khẩu"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  {/* Button */}
  <button type="submit" className="btn-signin">
    Đăng Nhập
  </button>
</form>


      {/* Links */}
      <div className="signin-links">
        <Link to="/register">Đăng ký</Link>
        <Link to="/forgot-password">Quên mật khẩu</Link>
      </div>
    </section>
  );
}
// backend trả JWT
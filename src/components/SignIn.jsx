import "../styles/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await login(username, password);
       let token;

      // Kiểm tra nếu responseData là một chuỗi (token trực tiếp) hoặc một đối tượng có thuộc tính 'token'
      if (typeof responseData === 'string') {
        token = responseData;
      } else if (responseData && responseData.token) {
        token = responseData.token;
      }

      if (!token) {
        console.error("Không nhận được token!");
        setErrorMessage("Đăng nhập thất bại: Không nhận được token.");
        return;
      }
      
      // Lưu JWT vào localStorage với key "authToken" để khớp với api.js
      localStorage.setItem("JWT", token);

      authLogin();
      
      console.log("Đăng nhập thành công, token đã được lưu.");
      
      // Chuyển hướng người dùng và tải lại trang để các component cập nhật trạng thái
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <section className="signin-container">
      <h2>Đăng Nhập Tài Khoản</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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

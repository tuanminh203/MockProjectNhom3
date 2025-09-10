import style from "../styles/Signin.css"
import { Link } from "react-router-dom";

export default function SignIn(){
    return  (
   <section className="signin-container">
      <h2>Đăng Nhập Tài Khoản</h2>
      <form>
        {/* Username */}
        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input type="text" placeholder="Nhập tên đăng nhập" />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>

        {/* Remember me */}
        <div className="form-remember">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Lưu tài khoản</label>
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
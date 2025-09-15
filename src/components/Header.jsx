import { Link } from "react-router-dom";
import { FiBell, FiUser, FiSearch } from "react-icons/fi"; // 👉 import icon
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">LOGO</div>

      {/* Menu */}
      <nav className="nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/friends">Danh sách bàn</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Liên hệ</Link>
      </nav>

      {/* Search + icons + auth */}
      <div className="right-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Tìm kiếm..." />
        </div>

        <FiBell className="icon" />
        <FiUser className="icon" />

        <div className="auth-links">
          <Link to="/register">Đăng ký</Link> |{" "}
          <Link to="/sign-in">Đăng nhập</Link>
        </div>
      </div>
    </header>
  );
}

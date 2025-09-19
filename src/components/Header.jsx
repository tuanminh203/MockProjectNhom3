import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from "react";
import "../styles/Header.css";
import logoteam from "../assets/icons/logoteam.png"; 

export default function Header() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Effect để kiểm tra trạng thái đăng nhập khi component được render
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
      <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/"> {/* 👈 Click logo sẽ đưa về trang chủ */}
          <img src={logoteam} alt="Logo Team" className="logo-img" />
        </Link>
      </div>

      {/* Menu */}
      <nav className="nav">
        <Link to="/">Trang chủ</Link>
        <Link to="/tables">Danh sách bàn</Link>
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
        <FiShoppingCart className="icon" />

        <div className="auth-links">
          {username ? (
            // Nếu đã đăng nhập, hiển thị lời chào và nút Đăng xuất
                        <div className="user-info">
                            <div className="welcome-text">
                                <span>Chào mừng {username}</span>
                            </div>
                            <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
                        </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị link Đăng ký/Đăng nhập
            <>
              <Link to="/register">Đăng ký</Link> |{" "}
              <Link to="/sign-in">Đăng nhập</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
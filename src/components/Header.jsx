import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/Header.css";
import logoteam from "../assets/icons/logoteam.png";
import CartOverlay from "./CartOverlay";

export default function Header() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
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
        <Link to="/">
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

        <div className="cart-icon-wrapper" onClick={() => setShowCart(true)}>
          <FiShoppingCart className="icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        <div className="auth-links">
          {username ? (
            <div className="user-info">
              <div className="welcome-text">
                <span>Chào mừng {username}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link to="/register">Đăng ký</Link> |{" "}
              <Link to="/sign-in">Đăng nhập</Link>
            </>
          )}
        </div>
      </div>

      {showCart && <CartOverlay onClose={() => setShowCart(false)} />}
    </header>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import "../styles/Header.css";
import CartOverlay from "./CartOverlay";
import { jwtDecode } from "jwt-decode";
import { ReactComponent as Logo } from '../assets/icons/logoteam.svg';

export default function Header() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    // Lấy token từ localStorage
    const storedToken = localStorage.getItem("JWT");
    if (storedToken) {
      try {
        // Giải mã token để lấy thông tin người dùng
        const decodedToken = jwtDecode(storedToken);
        const user = decodedToken.sub;
        if (user) {
          setUsername(user);
        }
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        // Xóa token lỗi để tránh vấn đề trong tương lai
        localStorage.removeItem("JWT");
      }
    }
  }, []);

  const handleLogout = () => {
    // Gọi hàm logout từ AuthContext
    logout();
    
    // Gọi hàm clearCart từ CartContext
    clearCart();
    
    // Xóa cả authToken và username khỏi localStorage
    localStorage.removeItem("JWT");
    navigate("/");
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
           <Logo className="logo-img" />
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
          {/* Hiển thị số lượng giỏ hàng khi có item */}
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        <div className="auth-links">
          {isLoggedIn ? ( 
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

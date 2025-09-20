import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/CartOverlay.css";

const CartOverlay = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const panelRef = useRef();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Đóng khi ấn Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="cart-overlay">
      <div className="cart-panel" ref={panelRef}>
        <h3>🛒 Giỏ hàng</h3>
        <button className="close-btn" onClick={onClose}>×</button>

        {cartItems.length === 0 ? (
          <p>Giỏ hàng đang trống.</p>
        ) : (
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p><strong>Giá:</strong> {item.price.toLocaleString()} đ</p>
                  <label>
                    <strong>Số lượng:</strong>{" "}
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.name, e.target.value)
                      }
                    />
                  </label>
                  <p><strong>Tổng:</strong> {(item.price * item.quantity).toLocaleString()} đ</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.name)}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-total">
          <strong>Tổng cộng:</strong> {total.toLocaleString()} đ
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
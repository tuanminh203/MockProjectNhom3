import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Giỏ hàng</h2>
        <p>{cartItems.length} sản phẩm</p>
      </div>
      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={`http://localhost:8080${item.menuItem.imageUrl}`}
                  alt={item.menuItem.name}
                  className="item-image"
                />
                <div className="item-details">
                  <span className="item-name">{item.menuItem.name}</span>
                  <span className="item-remove" onClick={() => removeFromCart(item.menuItem.id)}>
                    Xóa
                  </span>
                </div>
                <div className="item-price">
                  {item.menuItem.price.toLocaleString()} đ
                </div>
                <div className="item-controls">
                  <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.menuItem.id, Number(e.target.value))}
                  />
                  <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="order-summary">
          <h3>Tóm tắt đơn hàng</h3>
          <div className="summary-row">
            <span>Tạm tính:</span>
            <span>{subtotal.toLocaleString()} đ</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Thành tiền:</span>
            <span>{subtotal.toLocaleString()} đ</span>
          </div>
          <div className="summary-buttons">
            <Link to="/checkout" className="checkout-btn">
              Thanh toán ngay
            </Link>
            <Link to="/menu" className="continue-shopping-btn">
              Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

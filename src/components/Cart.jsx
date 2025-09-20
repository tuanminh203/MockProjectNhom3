import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>Giá: {item.price.toLocaleString()} đ</p>
                <label>
                  Số lượng:{" "}
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.name, e.target.value)}
                  />
                </label>
                <p>Tổng: {(item.price * item.quantity).toLocaleString()} đ</p>
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
      <div className="cart-total">Tổng cộng: {total.toLocaleString()} đ</div>
    </div>
  );
};

export default Cart;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import '../styles/CartOverlay.css';

const CartOverlay = ({ onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <div className="cart-overlay-backdrop">
      <div className="cart-overlay">
        <div className="cart-header">
          <h3>🛒 Giỏ hàng của bạn</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={`http://localhost:8080${item.menuItem.imageUrl}`} alt={item.menuItem.name} className="item-image" />
                <div className="item-details">
                  <span className="item-name">{item.menuItem.name}</span>
                  <span className="item-price">{item.menuItem.price.toLocaleString()} đ</span>
                </div>
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.menuItem.id, Number(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item.menuItem.id)}>Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Tổng cộng:</span>
            <span>{total.toLocaleString()} đ</span>
          </div>
          <Link to="/checkout" onClick={onClose} className="checkout-btn">
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;

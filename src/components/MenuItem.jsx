import React, { useEffect, useRef, useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../styles/MenuItem.css";

const MenuItem = ({ dish, quantity, onQuantityChange, onClose }) => {
  const cardRef = useRef();
  const [isClosing, setIsClosing] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") triggerClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        triggerClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`menu-item-overlay ${isClosing ? "fade-out" : "fade-in"}`}>
      <div
        className={`menu-item-card ${isClosing ? "scale-down" : "scale-up"}`}
        ref={cardRef}
      >
        <img src={dish.image} alt={dish.name} className="menu-item-image" />
        <h3>{dish.name}</h3>
        <p className="menu-item-price">{dish.price.toLocaleString()} đ</p>
        <p className="menu-item-description">{dish.description}</p>

        <input
          type="number"
          min="0"
          placeholder="Số lượng"
          value={quantity || ""}
          onChange={(e) => onQuantityChange(dish.name, e.target.value)}
        />
        <button onClick={() => addToCart(dish, Number(quantity) || 1)}>Thêm vào giỏ</button>
        <button onClick={() => onQuantityChange(dish.name, 0)}>Reset</button>
        <button onClick={triggerClose}>Đóng</button>
      </div>
    </div>
  );
};

export default MenuItem;
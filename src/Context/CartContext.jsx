import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === dish.name);
      if (existing) {
        return prev.map((item) =>
          item.name === dish.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...dish, quantity }];
      }
    });
  };

  const removeFromCart = (dishName) => {
    setCartItems((prev) => prev.filter((item) => item.name !== dishName));
  };

  const updateQuantity = (dishName, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty <= 0) return removeFromCart(dishName);

    setCartItems((prev) =>
      prev.map((item) =>
        item.name === dishName ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

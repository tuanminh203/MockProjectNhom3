import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCartApi, updateCartItemQuantityApi, removeCartItemApi } from '../api';
import { AuthContext } from "../Context/AuthContext";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isLoggedIn } = useContext(AuthContext); // 2. Lấy trạng thái đăng nhập từ context
    
    const clearCart = () => {
        setCartItems([]);
    };

    // Lấy giỏ hàng khi component được mount
    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCartItems(data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi lấy giỏ hàng:", err);
            setError("Không thể tải giỏ hàng. Vui lòng đăng nhập.");
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 3. Gọi fetchCart() mỗi khi isLoggedIn thay đổi
        fetchCart();
    }, [isLoggedIn]);

    const handleAddToCart = async (menuItem, quantity) => {
        try {
            const updatedCart = await addToCartApi(menuItem.id, quantity);
            setCartItems(updatedCart);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi thêm món vào giỏ hàng:", err);
            setError("Không thể thêm món vào giỏ. Vui lòng đăng nhập.");
        }
    };

    const handleUpdateQuantity = async (menuItemId, quantity) => {
        try {
            const updatedCart = await updateCartItemQuantityApi(menuItemId, quantity);
            setCartItems(updatedCart);
        } catch (err) {
            console.error("Lỗi khi cập nhật số lượng:", err);
        }
    };

    const handleRemoveFromCart = async (menuItemId) => {
        try {
            await removeCartItemApi(menuItemId);
            setCartItems(prevItems => prevItems.filter(item => item.menuItem.id !== menuItemId));
        } catch (err) {
            console.error("Lỗi khi xóa món khỏi giỏ hàng:", err);
        }
    };

    const value = {
        cartItems,
        loading,
        error,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeFromCart: handleRemoveFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

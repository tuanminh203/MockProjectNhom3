import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails, cancelOrder } from "../api.js";
import "../styles/OrderConfirmation.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderDetails(orderId);
                console.log("Dữ liệu đơn hàng nhận được:", orderData);
                console.log("Trạng thái đơn hàng:", orderData.status);
                setOrder(orderData);
            } catch (err) {
                console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
                if (err.response && err.response.status === 401) {
                    const errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
                    toast.error(errorMessage);
                    setError(errorMessage);
                } else {
                    const errorMessage = "Không tìm thấy đơn hàng hoặc có lỗi xảy ra.";
                    toast.error(errorMessage);
                    setError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handleCancelOrder = async () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            setIsCancelling(true);
            try {
                const canceledOrder = await cancelOrder(orderId);
                setOrder(canceledOrder);
                toast.success("Đơn hàng đã được hủy thành công!");
            } catch (err) {
                console.error("Lỗi khi hủy đơn hàng:", err);
                const errorMessage = err.response?.data?.message || "Không thể hủy đơn hàng này.";
                toast.error(errorMessage);
            } finally {
                setIsCancelling(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="order-confirmation-container loading-state">
                <p>Đang tải thông tin đơn hàng...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-confirmation-container error-state">
                <p>{error}</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-confirmation-container not-found-state">
                <p>Không có dữ liệu đơn hàng.</p>
            </div>
        );
    }
    
    // Sử dụng trực tiếp điều kiện trong JSX thay vì tạo biến trung gian
    return (
        <div className="order-confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-header">
                    <i className={`fas ${order.status === "CANCELLED" ? "fa-times-circle text-danger" : "fa-check-circle confirmation-icon"}`}></i>
                    <h1>{order.status === "CANCELLED" ? "Đơn hàng đã bị hủy!" : "Đặt hàng thành công!"}</h1>
                    <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.</p>
                </div>

                <div className="order-details-summary">
                    <h2>Chi tiết đơn hàng</h2>
                    <div className="detail-item">
                        <strong>Mã đơn hàng:</strong> <span>#{order.id}</span>
                    </div>
                    {/* <div className="detail-item">
                        <strong>Trạng thái:</strong> <span>{order.status}</span>
                    </div> */}
                    <div className="detail-item">
                        <strong>Ngày đặt hàng:</strong> <span>{new Date(order.orderDateTime).toLocaleString()}</span>
                    </div>
                    {order.canceledDateTime && (
                        <div className="detail-item">
                            <strong>Ngày hủy:</strong> <span>{new Date(order.canceledDateTime).toLocaleString()}</span>
                        </div>
                    )}
                    <div className="detail-item">
                        <strong>Tổng tiền:</strong>{" "}
                        <span className="total-amount">{order.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
                    </div>
                </div>

                {order.orderItems && (
                    <div className="order-items-list">
                        <h3>Danh sách món ăn</h3>
                        <ul>
                            {order.orderItems.map((item) => (
                                <li key={item.id}>
                                    {item.quantity} x {item.menuItem.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="confirmation-footer">
                    {(order.status === "PENDING") && (
                        <>
                            <button
                                className="btn-cancel"
                                onClick={handleCancelOrder}
                                disabled={isCancelling}
                            >
                                {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                            </button>
                            <button className="btn-pay" onClick={() => toast.info("Tính năng thanh toán đang được phát triển.")}>
                                Thanh toán
                            </button>
                        </>
                    )}

                    <button className="back-to-home-btn" onClick={() => (window.location.href = "/")}>
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
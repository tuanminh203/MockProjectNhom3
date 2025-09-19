import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Hàm gọi API đăng nhập
export const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
    });
    return response.data;
};

// Hàm gọi API đăng ký
export const register = async (requestBody) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Registration API failed:", error.response || error);
        throw error; 
    }
};

// Hàm gọi API xác thực tài khoản
export const confirmRegistration = async (email, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/confirm-registration`, { email, otp });
        return response.data;
    } catch (error) {
        console.error("Confirmation API failed:", error.response || error);
        throw error;
    }
};

// Hàm gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error("Forgot password API failed:", error.response || error);
        throw error;
    }
};

// Hàm đặt lại mật khẩu
export const resetPassword = async (requestBody) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, requestBody);
        return response.data;
    } catch (error) {
        console.error("Reset password API failed:", error.response || error);
        throw error;
    }
};

// Hàm gọi API lấy danh sách bàn trống
export const getAvailableTables = async () => {
    const response = await axios.get(`${API_BASE_URL}/reservations/tables/available`);
    return response.data;
};


// Hàm gọi API đặt bàn
export const makeReservation = async (tableId, requestBody, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/reservations/make/${tableId}`,
        requestBody,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
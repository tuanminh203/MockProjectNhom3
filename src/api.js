// import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/v1";

// // Hàm gọi API đăng nhập
// export const login = async (username, password) => {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//         username,
//         password,
//     });
//     return response.data;
// };

// // Hàm gọi API đăng ký
// export const register = async (requestBody) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/register`, requestBody, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Registration API failed:", error.response || error);
//         throw error; 
//     }
// };

// // Hàm gọi API xác thực tài khoản
// export const confirmRegistration = async (email, otp) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/confirm-registration`, { email, otp });
//         return response.data;
//     } catch (error) {
//         console.error("Confirmation API failed:", error.response || error);
//         throw error;
//     }
// };

// // Hàm gửi yêu cầu quên mật khẩu
// export const forgotPassword = async (email) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
//         return response.data;
//     } catch (error) {
//         console.error("Forgot password API failed:", error.response || error);
//         throw error;
//     }
// };

// // Hàm đặt lại mật khẩu
// export const resetPassword = async (requestBody) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, requestBody);
//         return response.data;
//     } catch (error) {
//         console.error("Reset password API failed:", error.response || error);
//         throw error;
//     }
// };

// // Hàm gọi API lấy danh sách bàn trống
// export const getAvailableTables = async () => {
//     const response = await axios.get(`${API_BASE_URL}/reservations/tables/available`);
//     return response.data;
// };


// // Hàm gọi API đặt bàn
// export const makeReservation = async (tableId, requestBody, token) => {
//     const response = await axios.post(
//         `${API_BASE_URL}/reservations/make/${tableId}`,
//         requestBody,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// };


// // ==========================================================
// // Các API công khai (public) cho Món ăn & Danh mục
// // ==========================================================

// // Lấy danh sách tất cả món ăn công khai
// export const getAllMenuItems = () => {
//   return axios.get(`${API_BASE_URL}/public/menu-items`);
// };

// // Lấy chi tiết một món ăn công khai theo ID
// export const getMenuItemById = (id) => {
//   return axios.get(`${API_BASE_URL}/public/menu-items/${id}`);
// };

// // Lấy danh sách tất cả danh mục công khai
// export const getAllCategories = () => {
//   return axios.get(`${API_BASE_URL}/public/categories`);
// };


// // --- API Giỏ hàng ---
// export const getCart = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/cart`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi xem giỏ hàng:", error);
//         throw error;
//     }
// };

// export const addToCartApi = async (menuItemId, quantity, token) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/cart`, { menuItemId, quantity }, 
//             {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi thêm món vào giỏ hàng:", error);
//         throw error;
//     }
// };

// export const updateCartItemQuantityApi = async (menuItemId, quantity) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/cart/${menuItemId}?quantity=${quantity}`);
//         return response.data;
//     } catch (error) {
//         console.error("Lỗi khi cập nhật số lượng:", error);
//         throw error;
//     }
// };

// export const removeCartItemApi = async (menuItemId) => {
//     try {
//         await axios.delete(`${API_BASE_URL}/cart/${menuItemId}`);
//     } catch (error) {
//         console.error("Lỗi khi xóa món khỏi giỏ hàng:", error);
//         throw error;
//     }
// };

import axios from 'axios';

// URL cơ sở của API backend
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Lấy token xác thực từ localStorage
const getAuthToken = () => {
    return localStorage.getItem('JWT');
};

// Cấu hình axios instance với interceptor để tự động thêm token vào header
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ==========================================================
// Các API xác thực (Authentication)
// ==========================================================

// Hàm gọi API đăng nhập và lưu token
export const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
    });
    const token = response.data.token; // Giả sử response trả về token
    if (token) {
        localStorage.setItem('JWT', token);
    }
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
        console.error("Lỗi khi đăng ký:", error.response || error);
        throw error; 
    }
};

// Hàm gọi API xác thực tài khoản
export const confirmRegistration = async (email, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/confirm-registration`, { email, otp });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xác thực tài khoản:", error.response || error);
        throw error;
    }
};

// Hàm gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu quên mật khẩu:", error.response || error);
        throw error;
    }
};

// Hàm đặt lại mật khẩu
export const resetPassword = async (requestBody) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, requestBody);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error.response || error);
        throw error;
    }
};

// ==========================================================
// Các API công khai (public) cho Món ăn & Danh mục
// ==========================================================

// Lấy danh sách tất cả món ăn công khai
export const getAllMenuItems = () => {
  return axios.get(`${API_BASE_URL}/public/menu-items`);
};

// Lấy chi tiết một món ăn công khai theo ID
export const getMenuItemById = (id) => {
  return axios.get(`${API_BASE_URL}/public/menu-items/${id}`);
};

// Lấy danh sách tất cả danh mục công khai
export const getAllCategories = () => {
  return axios.get(`${API_BASE_URL}/public/categories`);
};

// ==========================================================
// Các API đặt bàn (được bảo vệ bởi token)
// ==========================================================

// Lấy danh sách bàn trống
export const getAvailableTables = async () => {
    try {
        const response = await api.get('/reservations/tables/available');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bàn trống:", error);
        throw error;
    }
};

// Hàm đặt bàn
export const makeReservation = async (tableId, requestBody) => {
    try {
        const response = await api.post(`/reservations/make/${tableId}`, requestBody);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đặt bàn:", error);
        throw error;
    }
};


// ==========================================================
// Các API Giỏ hàng (được bảo vệ bởi token)
// ==========================================================

export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xem giỏ hàng:", error);
        throw error;
    }
};

export const addToCartApi = async (menuItemId, quantity) => {
    try {
        const response = await api.post('/cart', { menuItemId, quantity });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm món vào giỏ hàng:", error);
        throw error;
    }
};

export const updateCartItemQuantityApi = async (menuItemId, quantity) => {
    try {
        const response = await api.put(`/cart/${menuItemId}?quantity=${quantity}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
        throw error;
    }
};

export const removeCartItemApi = async (menuItemId) => {
    try {
        await api.delete(`/cart/${menuItemId}`);
    } catch (error) {
        console.error("Lỗi khi xóa món khỏi giỏ hàng:", error);
        throw error;
    }
};

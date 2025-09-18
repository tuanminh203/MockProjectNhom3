import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
    });
    return response.data;
};

export const getAvailableTables = async () => {
    const response = await axios.get(`${API_BASE_URL}/reservations/tables/available`);
    return response.data;
};

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
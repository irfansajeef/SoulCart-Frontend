import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart"; // ← Fix 1: add /api

// Get token helper
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` // ← Fix 2: add token
    }
});

export const addToCart = (cartItem) => {
    return axios.post(`${BASE_URL}/add`, cartItem, getAuthHeaders());
};

export const getCartItems = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}`, getAuthHeaders());
};

export const removeItem = (cartItemId) => {
    return axios.delete(`${BASE_URL}/deletecartID/${cartItemId}`, getAuthHeaders());
};

export const clearCart = (userId) => {
    return axios.delete(`${BASE_URL}/clear/${userId}`, getAuthHeaders());
};
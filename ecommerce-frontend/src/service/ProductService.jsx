import axios from "axios";

const API_URL = "https://soulcart-backend.onrender.com/api/products";

export const getProducts = () => {
    const token = localStorage.getItem("token"); 
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
};
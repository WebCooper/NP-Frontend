import axios from "axios";

// Dynamically determine the base URL
const API_URL = import.meta.env.VITE_API_URL;


export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})
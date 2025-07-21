// lib/axios.js
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL+ "/api",
  withCredentials: true, // ✅ send cookies always
});

// Attach Authorization header if token is in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // normal login
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

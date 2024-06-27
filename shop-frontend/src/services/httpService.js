import axios from "axios";

const base_url = import.meta.env.VITE_API_SERVER_URL || "http://localhost:5000";

const HTTP = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

// Add a request interceptor
HTTP.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Breaer ${token}`;
  }
  return config;
});

export default HTTP;


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", 
  timeout: 5000, 
});


axiosInstance.interceptors.request.use(
  (config) => {
        config.headers["Content-Type"] = "application/json";
        config.withCredentials = true;
    const token = localStorage.getItem('token'); 
    if (token) 
        config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'
      }

    return Promise.reject(error);
  }
);

export default axiosInstance;

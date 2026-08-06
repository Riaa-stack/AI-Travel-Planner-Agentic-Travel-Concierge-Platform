import axios from 'axios';

// Base URL specified in prompt requirements: http://127.0.0.1:5000 or fallback relative /api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 600000
});

// Axios Request Interceptor to attach JWT token stored in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ai_travel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios Response Interceptor for unified error handling & token expiration handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access (401). Clearing session and redirecting to login.');
      localStorage.removeItem('ai_travel_token');
      localStorage.removeItem('ai_travel_user');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

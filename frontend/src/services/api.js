import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/users/register', userData);
export const login = (credentials) => api.post('/users/login', credentials);
export const getUserById = (id) => api.get(`/users/${id}`);

// Crop APIs
export const getCropsByUserId = (userId) => api.get(`/crops/user/${userId}`);

// Disease Detection API
export const detectDisease = (formData) => {
  return axios.post(`${API_BASE_URL}/disease/detect`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

// Treatment API
export const getTreatment = (diseaseName) => api.get(`/treatment/${diseaseName}`);

// Chat APIs
export const sendChatMessage = (chatData) => api.post('/chat', chatData);
export const getChatHistory = (userId) => api.get(`/chat/history/${userId}`);

// Weather API
export const getWeather = (lat, lon) => api.get(`/weather/${lat}/${lon}`);

export default api;

// Made with Bob

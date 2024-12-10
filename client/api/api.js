import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL of server
const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance for API requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests if available
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Auth APIs
export const login = (email, password) => apiClient.post('/auth/login', { email, password });
export const register = (name, email, password) =>
  apiClient.post('/auth/register', { name, email, password });

// Task APIs
export const fetchTasks = () => apiClient.get('/tasks');
export const createTask = (taskData) => apiClient.post('/tasks', taskData);
export const updateTask = (taskId, updatedData) =>
  apiClient.put(`/tasks/${taskId}`, updatedData);
export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);
export const fetchCompletedTasks = () => apiClient.get('/tasks/completed');

// User Profile APIs
export const fetchProfile = () => apiClient.get('/profile');
export const updateProfile = (profileData) =>
  apiClient.put('/profile', profileData);

// Other APIs
export const fetchStatistics = () => apiClient.get('/statistics');

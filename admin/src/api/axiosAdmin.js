import axios from 'axios';

// Always use backend server on port 5000 for API calls
const API_BASE_URL = 'http://localhost:5000/api';

export const adminAuthAPI = {
  // Register (User or Admin)
  register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),
  // Login (User or Admin)
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
};

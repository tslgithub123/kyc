import axios from 'axios';

const BASE_API = 'http://localhost:8080/api';
export const base_api = axios.create({
  baseURL: BASE_API,
});

export const loginApi = {
  login: (credentials) => base_api.post('/auth/login', credentials),
};

const fetchCurrentUser = async (token) => {
  try {
    const response = await base_api.get('/auth/current-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    throw error;
  }
};

const api = {
  loginApi,
  fetchCurrentUser,
};

export default api;
import axios from 'axios';

const BASE_API = 'http://localhost:8080/api';
export const base_api = axios.create({
  baseURL: BASE_API,
});

const loginApi = {
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

const fetchCompanies = async () => {
  const fetchedCompanies = await base_api.get('/company-profile/all').then(res => res.data);
  return fetchedCompanies;
}

const fetchUsersByCompanyId = async (companyId) => {
  const fetchedUsers = await base_api.get(`/company-profile/users/${companyId}`).then(res => res.data);
  return fetchedUsers;
}

const api = {
  loginApi,
  fetchCurrentUser,
  fetchCompanies,
  fetchUsersByCompanyId
};

export default api;
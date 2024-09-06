import axios from 'axios';
import endpoints from './endpoints';
import { useAuthStore } from '../store/store';

const base_api = axios.create({
  baseURL: endpoints.BASE_API,
});

base_api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const loginApi = {
  login: (credentials) => base_api.post(endpoints.auth.login, credentials),
};

const fetchCurrentUser = async (token) => {
  try {
    const response = await base_api.get(endpoints.auth.currentUser, {
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
  try {
    const response = await base_api.get(endpoints.companyProfile.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

const fetchUsersByCompanyId = async (companyId) => {
  try {
    const response = await base_api.get(endpoints.companyProfile.usersByCompanyId(companyId));
    return response.data;
  } catch (error) {
    console.error('Error fetching users by company ID:', error);
    throw error;
  }
};

const checkUsernameExists = async (username) => {
  if (username === '') {
    return;
  }
  try {
    const response = await base_api.get(endpoints.user.usernameExists(username));
    return response.data;
  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
};

const registerUser = async (submitData) => {
  try {
    const response = await base_api.post(endpoints.auth.register, submitData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const getAllUserProfiles = async () => {
  try {
    const response = await base_api.get(endpoints.user.allProfiles);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    throw error;
  }
};

const updateUserLockStatus = async (id, locked) => {
  try {
    const response = await base_api.put(endpoints.user.updateLockStatus(id), null, {
      params: { locked },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating lock status:', error);
    throw error;
  }
};

const fetchAllRoles = async () => {
  try {
    const response = await base_api.get(endpoints.role.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}

const deleteUserProfiles = async (ids) => {
  try {
    await base_api.delete(endpoints.user.deleteProfiles, { data: { ids } });
  } catch (error) {
    console.error('Error deleting profiles:', error);
    throw error;
  }
}

const api = {
  loginApi,
  fetchCurrentUser,
  fetchCompanies,
  fetchUsersByCompanyId,
  checkUsernameExists,
  registerUser,
  getAllUserProfiles,
  updateUserLockStatus,
  fetchAllRoles
};

export default api;

import axios, {AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import endpoints from './endpoints';
import { useAuthStore } from '../store/store';
import { CompanyProfile, Credentials, Role, User } from './types';

const base_api = axios.create({
  baseURL: endpoints.BASE_API,
});

base_api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const loginApi = {
  login: (credentials: Credentials): Promise<AxiosResponse<any>> => base_api.post(endpoints.auth.login, credentials),
};

const fetchCurrentUser = async (token: string): Promise<User> => {
  try {
    const response = await base_api.get<User>(endpoints.auth.currentUser, {
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

const fetchCompanies = async (): Promise<CompanyProfile[]> => {
  try {
    const response = await base_api.get<CompanyProfile[]>(endpoints.companyProfile.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

const fetchUsersByCompanyId = async (companyId: string): Promise<User[]> => {
  try {
    const response = await base_api.get<User[]>(endpoints.companyProfile.usersByCompanyId(companyId));
    return response.data;
  } catch (error) {
    console.error('Error fetching users by company ID:', error);
    throw error;
  }
};

const checkUsernameExists = async (username: string): Promise<boolean | undefined> => {
  if (username === '') {
    return;
  }
  try {
    const response = await base_api.get<boolean>(endpoints.user.usernameExists(username));
    return response.data;
  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
};

const registerUser = async (submitData: any): Promise<any> => {
  try {
    const response = await base_api.post(endpoints.auth.register, submitData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const getAllUserProfiles = async (): Promise<User[]> => {
  try {
    const response = await base_api.get<User[]>(endpoints.user.allProfiles);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    throw error;
  }
};


const updateUserLockStatus = async (id: string, locked: boolean): Promise<any> => {
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

const fetchAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await base_api.get<Role[]>(endpoints.role.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// const deleteUserProfiles = async (ids: string[]): Promise<void> => {
//   try {
//     await base_api.delete(endpoints.user.deleteProfiles, { data: { ids } });
//   } catch (error) {
//     console.error('Error deleting profiles:', error);
//     throw error;
//   }
// };

const fetchUser = async (id: string): Promise<User> => {
  try {
    const response = await base_api.get<User>(endpoints.employee.user(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const api = {
  loginApi,
  fetchCurrentUser,
  fetchCompanies,
  fetchUsersByCompanyId,
  checkUsernameExists,
  registerUser,
  getAllUserProfiles,
  updateUserLockStatus,
  fetchAllRoles,
  fetchUser,
};

export default api;

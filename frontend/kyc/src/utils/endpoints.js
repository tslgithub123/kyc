const BASE_API = 'http://localhost:8080/api';

const endpoints = {
  auth: {
    login: `${BASE_API}/auth/login`,
    currentUser: `${BASE_API}/auth/current-user`,
    register: `${BASE_API}/auth/register`,
  },
  companyProfile: {
    all: `${BASE_API}/company-profile/all`,
    usersByCompanyId: (companyId) => `${BASE_API}/company-profile/users/${companyId}`,
  },
  user: {
    usernameExists: (username) => `${BASE_API}/user/username-exists/${username}`,
    allProfiles: `${BASE_API}/user/all`,
    updateLockStatus: (id) => `${BASE_API}/user/${id}/lock`,
    deleteProfiles: `${BASE_API}/user/delete`,
  },
  employee: {
    all: `${BASE_API}/employee/all`,
    user: (id) => `${BASE_API}/employee/user/${id}`,
  },
  role: {
    all: `${BASE_API}/role/all`,
  },
};

export default endpoints;

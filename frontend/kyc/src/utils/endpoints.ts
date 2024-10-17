const BASE_API: string = import.meta.env.VITE_BASE_API as string;

interface Endpoints {
  BASE_API: string;
  auth: {
    login: string;
    currentUser: string;
    register: string;
  };
  companyProfile: {
    all: string;
    usersByCompanyId: (companyId: string) => string;
  };
  user: {
    usernameExists: (username: string) => string;
    allProfiles: string;
    updateLockStatus: (id: string) => string;
    deleteProfiles: string;
    allByCompanyUnitId: (companyUnitId: string) => string;
  };
  employee: {
    all: string;
    user: (id: string) => string;
  };
  role: {
    all: string;
  };
}

const endpoints: Endpoints = {
  BASE_API,
  auth: {
    login: `${BASE_API}/auth/login`,
    currentUser: `${BASE_API}/auth/current-user`,
    register: `${BASE_API}/auth/register`,
  },
  companyProfile: {
    all: `${BASE_API}/company-profile/all`,
    usersByCompanyId: (companyId: string) => `${BASE_API}/company-profile/users/${companyId}`,
  },
  user: {
    usernameExists: (username: string) => `${BASE_API}/user/username-exists/${username}`,
    allProfiles: `${BASE_API}/user/all`,
    updateLockStatus: (id: string) => `${BASE_API}/user/${id}/lock`,
    deleteProfiles: `${BASE_API}/user/delete`,
    allByCompanyUnitId: (companyUnitId: string) => `${BASE_API}/user/all/unit/${companyUnitId}`,
  },
  employee: {
    all: `${BASE_API}/employee/all`,
    user: (id: string) => `${BASE_API}/employee/user/${id}`,
  },
  role: {
    all: `${BASE_API}/role/all`,
  },
};

export default endpoints;

export interface Credentials {
    username: string;
    password: string;
}

export interface IUserRegistration {
  employeeFullName: string;
  email: string;
  roleId: string;
  companyUnitId: string;
  phone: string;
  username: string;
  password: string;
}

export interface RegistrationResponse {
    results: Array<{
        email: string;
        status: 'SUCCESS' | 'ALREADY_EXISTS' | 'INVALID_PASSWORD' | 'EMAIL_FAILURE' | 'EMPTY_FIELDS' | 'FAILURE';
        message?: string;
    }>;
    overallStatus: 'SUCCESS' | 'PARTIAL_SUCCESS';
  }


export interface User {
    id: number;
    username: string;
    password: string;
    roles: Role;
    enabled: boolean;
    designation: string;
    companyProfile: CompanyProfile;
    failedLoginCount: number;
    lastLoginDate: string;
    locked: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}

export interface Role {
    some(arg0: (role: { authority: string; }) => boolean): unknown;
    map(arg0: (role: any) => any): string[];
    authority: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
export interface CurrentUser {
    roles: string[];
    username: string;
}

export interface CompanyProfile {
    id: string;
    contactPerson: ContactPerson | null;
    mpcbId: number | null;
    industryLink: IndustryLink | null;
    branch: string;
    category: string;
    name: string;
    email: string;
    fax: string | null;
    lastEnvironment: string | null;
    workDay: number | null;
    phoneNumber: string;
    website: string | null;
    workingHour: number | null;
    yearEstablished: number | null;
    addresses: Address[];
    employees: Employee[];
    users: User[];
}

export interface ContactPerson {

}

export interface IndustryLink {
    // Define the properties of IndustryLink based on your requirements
}

export interface Address {
    // Define the properties of Address based on your requirements
}

interface Employee {
    id: string;
    companyProfile: CompanyProfile;
    user: User;
    address: Address;
    contactPerson: ContactPerson;
    name: string;
    gender: string;
    birthday: Date;
    email: string;
    status: string;
    emailStatus: string;
    profileStatus: string;
    profilePicture: string;
    maritalStatus: string;
}

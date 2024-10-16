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
    id: string;
    username: string;
    roles: Role[];
    enabled: boolean;
    designation: string;
    companyUnit: CompanyUnit;
    failedLoginCount: number;
    lastLoginDate: string;
    locked: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}

export interface Role {
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
    contactPerson: ContactPerson;
    mpcbId: number;
    name: string;
    email: string;
    fax: string;
    lastEnvironment: string;
    phoneNumber: string;
    website: string;
    yearEstablished: number;
}

export interface ContactPerson {
    id: string;
    name: string;
    designation: string;
    phone: string;
    email: string;
}

export interface IndustryLink {
    id: string;
    industryScale: IndustryScale;
    industryType: IndustryType;
    industryCategory: IndustryCategory;
}

export interface IndustryScale {
    id: string;
    name: string;
}

export interface IndustryType {
    id: string;
    name: string;
}

export interface IndustryCategory {
    // Define the properties of IndustryCategory based on your requirements
}

export interface Address {
    id: string;
    street: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    district: string;
    country: string;
    pincode: string;
    village: string;
    taluka: string;
    plotNumber: string;
    ro: string;
    sro: string;
}

export interface CompanyUnit {
    id: string;
    companyProfile: CompanyProfile;
    address: Address;
    industryLink: IndustryLink;
    name: string;
    email: string;
    fax: string;
    workDay: number;
    workingHour: number;
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

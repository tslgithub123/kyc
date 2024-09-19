export interface Credentials {
    username: string;
    password: string;
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
    lastLoginDate: string; // ISO date format
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
    id: number;
    mpcbid: string | null;
    branch: string;
    category: string;
    city: string;
    compName: string;
    contPerDesig: string | null;
    contPerName: string | null;
    contPerNo: string | null;
    country: string;
    district: string | null;
    email: string;
    fax: string | null;
    indPrimary: string | null;
    indSecondary: string | null;
    industryType: string | null;
    lastEnv: string | null;
    noWorkDays: string | null;
    phoneNo: string;
    pincode: string | null;
    plotNo: string | null;
    ro: string | null;
    sro: string | null;
    state: string;
    street: string | null;
    taluka: string | null;
    uan: string | null;
    village: string | null;
    website: string | null;
    workingHour: string | null;
    yearEstb: string | null;
    compEmail: string | null;
}

export interface Employee {
    id: number;
    user: User;
    companyProfile: CompanyProfile;
    employeeName: string;
    gender: string;
    birthday: string;
    address: string;
    address2: string;
    address3: string;
    contactPersonDesignation: string;
    contactPersonNumber: string;
    email: string;
    status: string;
    emailStatus: string;
    profileStatus: string;
    profilePic: string;
    maritalStatus: string;
}

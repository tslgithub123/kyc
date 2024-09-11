import { Route, Routes } from 'react-router-dom';
import CompanyProfileAccordian from '../components/admin/company/CompanyProfileAccordian';
import UserProfilesTable from '../components/admin/user/UserProfilesTable';
import UserProfileForm from '../components/admin/user/UserProfileForm';
import AdminProfile from '../components/admin/profile/AdminProfile';
import AdminDashboard from '../components/admin/AdminDashboard';
import EnvDashboard from '../components/env/EnvDashboard';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="/user/create" element={<UserProfileForm />} />
      <Route path="/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function EnvRoutes() {
  return (
    <Routes>
      <Route path="/adadada" element={<EnvDashboard/>} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="/user/create" element={<UserProfileForm />} />
      <Route path="/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function ManRoutes() {
  return (
    <Routes>
      <Route path="/asasas" element={<AdminDashboard />} />
      <Route path="/consent" element={<CompanyProfileAccordian />} />
      <Route path="/daily-data" element={<CompanyProfileAccordian />} />
      <Route path="/h-waste" element={<UserProfileForm />} />
      <Route path="/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function ThpRoutes() {
  return (
    <Routes>
      <Route path="/dadsadad" element={<AdminDashboard />} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="/user/create" element={<UserProfileForm />} />
      <Route path="/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}


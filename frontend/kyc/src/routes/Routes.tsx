import { Route, Routes } from 'react-router-dom';
import CompanyProfileAccordian from '../components/tsl/admin/company/CompanyProfileAccordian';
import UserProfilesTable from '../components/tsl/admin/user/UserProfilesTable';
import UserProfileForm from '../components/tsl/admin/user/UserProfileForm';
import AdminProfile from '../components/tsl/admin/profile/AdminProfile';
import AdminDashboard from '../components/tsl/admin/AdminDashboard';
import EnvDashboard from '../components/tsl/env/EnvDashboard';
import CreateUserPage from '../components/tsl/admin/user/CreateUserPage';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="/user/create" element={<CreateUserPage/>} />
      <Route path="/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function EnvRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EnvDashboard/>} />
      <Route path="/consent/add" element={<CompanyProfileAccordian />} />
      <Route path="/consent/view" element={<CompanyProfileAccordian />} />
      <Route path="/data/daily/add" element={<UserProfileForm />} />
      <Route path="/data/daily/view" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function ManRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/statistics" element={<CompanyProfileAccordian />} />
      <Route path="/performance" element={<CompanyProfileAccordian />} />
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


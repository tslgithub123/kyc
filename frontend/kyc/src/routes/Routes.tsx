import { Route, Routes } from 'react-router-dom';
import CompanyProfileAccordian from '../components/client/admin/company/CompanyProfileAccordian';
import AdminProfile from '../components/client/admin/profile/AdminProfile';
import EnvDashboard from '../components/client/env/EnvDashboard';
import SuperAdminDashboard from '../components/tsl/TslDashboard';
import UserPage from '../components/client/admin/user/UserPage';
import CompanyPage from '../components/client/admin/company/CompanyPage';
import ClearanceForm from '../components/client/env/ec/ClearanceForm';
import AdminDashboard from '../components/client/admin/dashboard/AdminDashboard';
import ThirdPartyDashboard from '../components/client/thirdparty/ThirdPartyDashboard';
import ManagementDashboard from '../components/client/management/ManagementDashboard';
import DirectorDashboard from '../components/client/director/DirectorDashboard';
import CompaniesPage from '../components/tsl/companies/CompaniesPage';
import NotificationsPage from '../components/notifications/NotificationsPage';

export function TslRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard/>} />
      <Route path="/companies" element={<CompaniesPage/>} />
      <Route path="/mpcb" element={<CompanyProfileAccordian />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}

export function DirectorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DirectorDashboard/>} />
      <Route path="/statistics" element={<CompanyProfileAccordian />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/company" element={<CompanyPage/>} />
      <Route path="/users" element={<UserPage/>} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}

export function EnvRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EnvDashboard/>} />
      <Route path="/consent/add" element={<CompanyProfileAccordian />} />
      <Route path="/consent/view" element={<CompanyProfileAccordian />} />
      <Route path="/ec/add" element={<ClearanceForm/>} />
      <Route path="/ec/view" element={<CompanyProfileAccordian />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}

export function ManRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ManagementDashboard/>} />
      <Route path="/statistics" element={<CompanyProfileAccordian />} />
      <Route path="/performance" element={<CompanyProfileAccordian />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}

export function ThpRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ThirdPartyDashboard/>} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
    </Routes>
  );
}


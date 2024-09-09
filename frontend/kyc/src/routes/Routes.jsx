import { Route, Routes } from 'react-router-dom';
import CompanyProfileAccordian  from '../components/admin/company/CompanyProfileAccordian';
import UserProfilesTable from '../components/admin/user/UserProfilesTable';
import UserProfileForm from '../components/admin/user/UserProfileForm';
import AdminProfile from '../components/admin/profile/AdminProfile';
import AdminDashboard from '../components/admin/AdminDashboard';


function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard/>} />
      <Route path="test/admin/company/create" element={<CompanyProfileAccordian/>} />
      <Route path="test/admin/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="test/admin/user/create" element={<UserProfileForm/>} />
      <Route path="test/admin/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile/>} />
    </Routes>
  );
}

export default AdminRoutes;
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';
import CompanyProfileAccordian from '../company/CompanyProfileAccordian';
import UserProfileForm from '../user/UserProfileForm';
import UserProfilesTable from '../user/UserProfilesTable';
import AdminProfile from '../profile/AdminProfile';

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="test/admin/company/create" element={<CompanyProfileAccordian />} />
      <Route path="test/admin/company/manage" element={<CompanyProfileAccordian />} />
      <Route path="test/admin/user/create" element={<UserProfileForm />} />
      <Route path="test/admin/user/manage" element={<UserProfilesTable />} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export default AdminRoutes;
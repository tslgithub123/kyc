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

                {/* <Route path="create" element={<CreateCompanyProfile />} /> */}
                <Route path="admin/company/manage" element={<CompanyProfileAccordian />} />
                <Route path="admin/user/create" element={<UserProfileForm />} />
                <Route path="admin/user/manage" element={<UserProfilesTable />} />
            <Route path=''>
                <Route path="/profile" element={<AdminProfile/>} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;

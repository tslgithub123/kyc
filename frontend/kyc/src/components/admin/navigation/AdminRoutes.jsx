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
            <Route path="company-profiles">
                {/* <Route path="create" element={<CreateCompanyProfile />} /> */}
                <Route path="manage" element={<CompanyProfileAccordian />} />
            </Route>
            <Route path="user-profiles">
                <Route path="create" element={<UserProfileForm />} />
                <Route path="manage" element={<UserProfilesTable />} />
            </Route>
            <Route path=''>
                <Route path="/profile" element={<AdminProfile/>} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;

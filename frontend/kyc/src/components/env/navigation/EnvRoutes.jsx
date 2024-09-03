import { Route, Routes } from 'react-router-dom';
import EnvDashboard from '../EnvDashboard';

function EnvRoutes() {
    return (
        <Routes>
            <Route path="/" element={<EnvDashboard/>} />
            <Route path="company-profiles">
                {/* <Route path="create" element={<CreateCompanyProfile />} /> */}
                {/* <Route path="manage" element={<CompanyProfileAccordian />} /> */}
            </Route>
            <Route path="user-profiles">
                {/* <Route path="create" element={<UserProfileForm />} />
                <Route path="manage" element={<UserProfilesTable />} /> */}
            </Route>
        </Routes>
    );
}

export default EnvRoutes;

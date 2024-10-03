import { Route, Routes } from 'react-router-dom';
import CompanyProfileAccordian from '../components/client/admin/company/CompanyProfileAccordian';
import AdminProfile from '../components/client/admin/profile/AdminProfile';
import EnvDashboard from '../components/client/env/EnvDashboard';
import SuperAdminDashboard from '../components/superadmin/SuperAdminDashboard';
import MpcbDashboard from '../components/mpcb/MpcbDashboard';
import UserPage from '../components/client/admin/user/UserPage';
import CompanyPage from '../components/client/admin/company/CompanyPage';
import ClearanceForm from '../components/client/env/ec/ClearanceForm';
import AdminDashboard from '../components/client/admin/dashboard/AdminDashboard';
import ManagementDashboard from '../components/client/management/ManagementDashboard';
import ThirdPartyDashboard from '../components/client/thirdparty/ThirdPartyDashboard';
import Transmission from '../components/client/env/Transmission';
import Hazardous from '../components/client/env/hazardouswaste/Hazardous';
import ConsentForm from '../components/client/env/consent/ConsentForm';

export function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard/>} />
      <Route path="/mpcb" element={<CompanyProfileAccordian />} />
    </Routes>
  );
}

export function MpcbRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MpcbDashboard/>} />
      <Route path="/statistics" element={<CompanyProfileAccordian />} />
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
    </Routes>
  );
}

export function EnvRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EnvDashboard/>} />
      <Route path="/consent/add" element={<ConsentForm />} />
      <Route path="/consent/view" element={<Transmission />} />
      <Route path="/ec/add" element={<ClearanceForm/>} />
      <Route path="/ec/view" element={<CompanyProfileAccordian />} />
      <Route path="/compliance/add" element={<Hazardous/>} />
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}

export function ManRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ManagementDashboard/>} />
      <Route path="/statistics" element={<CompanyProfileAccordian />} />
      <Route path="/performance" element={<CompanyProfileAccordian />} />
    </Routes>
  );
}

export function ThpRoutes() {
  return (
    <Routes>
      <Route path="/dadsadad" element={<ThirdPartyDashboard/>} />
      <Route path="/company/create" element={<CompanyProfileAccordian />} />
      <Route path="/company/manage" element={<CompanyProfileAccordian />} />
      
     
      <Route path="/profile" element={<AdminProfile />} />
    </Routes>
  );
}


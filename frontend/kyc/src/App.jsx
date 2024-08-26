import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/auth/login/Login'
import ProtectedRoute from './components/auth/login/ProtectedRoute'
import Dashboard from './components/home/HomeDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import EnvDashboard from './components/env/EnvDashboard'
import ManagementDashboard from './components/management/ManagementDashboard'
import ThirdPartyDashboard from './components/thirdparty/ThirdPartyDashboard'
import HomeNavbar from './components/home/HomeNavbar'
import CompanyProfiles from './components/admin/CompanyProfiles'
import UserProfiles from './components/admin/UserProfiles'
import AdminNavbar from './components/admin/AdminNavbar'
import AdminDrawer from './components/admin/AdminDrawer'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  const location = useLocation();
  // const showHomeNavbar = location.pathname === '/' || location.pathname === '/login';
  // const showAdminDrawer = location.pathname === '/admin-home';

  return (
    <>
      {/* {showHomeNavbar && <HomeNavbar />} */}
      {/* {showAdminDrawer && <AdminDrawer/>} */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminDrawer /></ProtectedRoute>}/>
        <Route path="/environment-officer-dashboard" element={<ProtectedRoute><EnvDashboard /></ProtectedRoute>} />
        <Route path="/management-dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
        <Route path="/third-party-dashboard" element={<ProtectedRoute><ThirdPartyDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

function KycApp() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default KycApp
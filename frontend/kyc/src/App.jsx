import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <>
    <HomeNavbar/>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company-profiles" element={<CompanyProfiles />} />
        <Route path="/user-profiles" element={<UserProfiles />} />

        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/environment-officer-dashboard" element={<ProtectedRoute><EnvDashboard/></ProtectedRoute>} />
        <Route path="/management-dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
        <Route path="/third-party-dashboard" element={<ProtectedRoute><ThirdPartyDashboard/></ProtectedRoute>} />
      </Routes>
    </>
  )
}

function KycApp() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default KycApp

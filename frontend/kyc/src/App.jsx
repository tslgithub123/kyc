import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/auth/login/Login'
import ProtectedRoute from './components/auth/login/ProtectedRoute'
import EnvDashboard from './components/env/EnvDashboard'
import ManagementDashboard from './components/management/ManagementDashboard'
import ThirdPartyDashboard from './components/thirdparty/ThirdPartyDashboard'
import AdminDrawer from './components/admin/navigation/AdminDrawer'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import EnvDrawer from './components/env/navigation/EnvDrawer'
import AdminProfile from './components/admin/profile/AdminProfile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminDrawer /></ProtectedRoute>}/>
        <Route path="/env" element={<ProtectedRoute><EnvDrawer/></ProtectedRoute>} />
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
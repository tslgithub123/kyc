import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectedRoute from './components/auth/login/ProtectedRoute';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import Login from './components/auth/login/Login'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/dates/styles.css';
import AdminNav from './components/client/admin/navigation/AdminNav';
import EnvNav from './components/client/env/navigation/EnvNav';
import ManNav from './components/client/management/navigation/ManNav';
import SuperAdminNav from './components/superadmin/navigation/SuperAdminNav';
import MpcbNav from './components/mpcb/navigation/MpcbNav';
import Unauthorized from './components/auth/Unauthorized';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/superadmin/*" element={
          <ProtectedRoute allowedRoles={['ROLE_SUPERADMIN']}>
            <SuperAdminNav/>
          </ProtectedRoute>
        }/>
        <Route path="/mpcb/*" element={
          <ProtectedRoute allowedRoles={['ROLE_MPCB']}>
            <MpcbNav/>
          </ProtectedRoute>
        }/>
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminNav/>
          </ProtectedRoute>
        }/>
        <Route path="/env/*" element={
          <ProtectedRoute allowedRoles={['ROLE_ENVIRONMENT_OFFICER']}>
            <EnvNav/>
          </ProtectedRoute>
        }/>
        <Route path="/man/*" element={
          <ProtectedRoute allowedRoles={['ROLE_MANAGEMENT']}>
            <ManNav/>
          </ProtectedRoute>
        }/>
        {/* <Route path="/thp/*" element={
          <ProtectedRoute allowedRoles={['ROLE_THIRD_PARTY']}>
            <ThpNav/>
          </ProtectedRoute>
        }/> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  )
}

function KycApp() {
  const queryClient = new QueryClient()
  const theme = createTheme({
    colors: {
      primary: virtualColor({
        name: 'primary',
        dark: 'pink',
        light: 'cyan',
      }),
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider theme={theme}>
        <Notifications/>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default KycApp
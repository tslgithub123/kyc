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
import Unauthorized from './components/auth/Unauthorized';
import TslNav from './components/tsl/navigation/TslNav';
import ThpNav from './components/client/thirdparty/navigation/ThpNav';
import DirectorNav from './components/client/director/navigation/DirectorNav';
import ClientRegistration from './components/auth/client/ClientRegistration';
import HomePage from './components/home/HomePage';
import HomeNav from './components/home/HomeNav';
import NotificationsPage from './components/notifications/NotificationsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeNav/>} />
        <Route path="/home" element={<HomeNav/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ClientRegistration/>} />
        
        <Route path="/tsl/*" element={
          <ProtectedRoute allowedRoles={['ROLE_TSL']}>
            <TslNav/>
          </ProtectedRoute>
        }/>
        <Route path="/director/*" element={
          <ProtectedRoute allowedRoles={['ROLE_DIRECTOR']}>
            <DirectorNav/>
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
        <Route path="/thp/*" element={
          <ProtectedRoute allowedRoles={['ROLE_THIRD_PARTY']}>
            <ThpNav/>
          </ProtectedRoute>
        }/>
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
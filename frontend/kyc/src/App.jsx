import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/auth/login/ProtectedRoute'
import EnvDashboard from './components/env/EnvDashboard'
import ManagementDashboard from './components/management/ManagementDashboard'
import ThirdPartyDashboard from './components/thirdparty/ThirdPartyDashboard'
import AdminDrawer from './components/admin/navigation/AdminDrawer'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import EnvDrawer from './components/env/navigation/EnvDrawer'
import AdminProfile from './components/admin/profile/AdminProfile'
import Navigation from './components/admin/new_nav/Navigation'
import NewLogin from './components/auth/login/NewLogin'
import Login from './components/auth/login/NewLogin'


function App() {
  return (
    <>
      <Routes>
        <Route path='/test/*' element={<Navigation/>}></Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute><Navigation/></ProtectedRoute>}/>
        <Route path="/env" element={<ProtectedRoute><EnvDrawer/></ProtectedRoute>} />
        <Route path="/management-dashboard" element={<ProtectedRoute><ManagementDashboard /></ProtectedRoute>} />
        <Route path="/third-party-dashboard" element={<ProtectedRoute><ThirdPartyDashboard /></ProtectedRoute>} />
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
          <App />
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default KycApp
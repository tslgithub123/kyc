import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectedRoute from './components/auth/login/ProtectedRoute';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import Login from './components/auth/login/Login'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/dates/styles.css';
import AdminNav from './components/admin/navigation/AdminNav';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminNav/></ProtectedRoute>}/>
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
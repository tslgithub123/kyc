import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';
import { useLogin } from '../../hooks/useLogin';
import logo from '../../../assets/logo.png';
import { Divider, Stack } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://techknowgreen.com/">
        Techknowgreen
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#eff2f6',
    },
  },
});

export default function LogIn() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const loginMutation = useLogin();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),
    };

    console.log('credentials', credentials);

    try {
      const loginResponse = await loginMutation.mutateAsync(credentials);
      const { token, role } = loginResponse.data;
      setToken(token);
      console.log("role: ", role);
      switch (role) {
        case 'ROLE_ADMIN':
          navigate('/admin');
          break;
        case 'ROLE_ENVIRONMENT_OFFICER':
          navigate('/environment-officer-dashboard');
          break;
        case 'ROLE_MANAGEMENT':
          navigate('/management-dashboard');
          break;
        case 'ROLE_THIRD_PARTY':
          navigate('/third-party-dashboard');
          break;
        default:
          // navigate('/dashboard');
          break;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#eff2f6', height: '100vh' }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 3,
              padding: 3,
            }}
          >

<Grid item sx={{ mb: 3 }}>
            <img src={logo} alt="Logo" style={{ width: '100%' }} />

            <hr/> 
            </Grid>

              
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                <Typography component="h1" variant="h5" color="success.main" >
                  Welcome
                </Typography>
                <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                  Enter your credentials to continue
                </Typography>
              </Stack>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              
              <Box sx={{ mt: 2 }}>
              {/* disabled={isSubmitting} */}
                <Button disableElevation  fullWidth size="large" type="submit" variant="contained" color="success">
                  Sign in
                </Button>
              </Box>
              <Stack alignItems="center" margin={2} justifyContent="center" spacing={1}>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
              </Stack>
              
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
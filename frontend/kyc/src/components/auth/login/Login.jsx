import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';
import { useLogin } from '../../hooks/useLogin';
import LoginForm from './LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const loginMutation = useLogin();

  const handleSubmit = async (credentials) => {
    try {
      const loginResponse = await loginMutation.mutateAsync(credentials);
      const { token, role } = loginResponse.data;
      setToken(token);
      console.log("role: ", role);
        switch (role) {
          case 'ROLE_ADMIN':
            navigate('/admin-dashboard');
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
      } 
catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={loginMutation.isLoading}
        error={loginMutation.error}
      />
    </div>
  );
};

export default Login;
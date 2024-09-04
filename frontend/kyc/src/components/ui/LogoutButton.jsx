import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';
import { Link } from '@mui/material';


const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Link
      onClick={handleLogout}
      variant="outlined"
      color='error'
      underline='none'
    >
      Logout
    </Link>
  );
};

export default LogoutButton;
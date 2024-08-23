import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
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
      <LogoutIcon/>  Logout
    </Link>
  );
};

export default LogoutButton;
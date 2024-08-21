import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';


const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Clear the token from Zustand store
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;

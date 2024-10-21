import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/store';


const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    
  };

  return (
    <a onClick={handleLogout} href="#" className="logout-button">
      Logout </a>

  );
};

export default LogoutButton;
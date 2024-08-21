import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useAuthStore } from '../../store/store';
import LogoutButton from '../ui/Logout';


function ThirdPartyDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      console.error('No token found!');
      return;
    }
  }, [token]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div>
      <h1>Welcome Third Party, {currentUser?.username}!</h1>
      <p>Your role: {currentUser?.roles.join(', ')}</p>
      <div>
        <LogoutButton/>
      </div>
    </div>
  );
}

export default ThirdPartyDashboard;

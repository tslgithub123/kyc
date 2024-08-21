import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import LogoutButton from '../ui/Logout';
import AdminNavbar from './AdminNavbar';

function AdminDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      console.log('User data loaded:', currentUser);
    }
  }, [currentUser]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div>
      
      <h1>Welcome Admin, {currentUser?.username}!</h1>
      <p>Your role: {currentUser?.roles.join(', ')}</p>
      <LogoutButton />
    </div>
  );
}

export default AdminDashboard;

import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

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
    </div>
  );
}

export default AdminDashboard;

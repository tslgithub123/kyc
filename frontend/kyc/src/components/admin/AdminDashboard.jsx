import React, { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import CreateUserProfileCard from './cards/CreateUserProfileCard';
import CreateCompanyProfileCard from './cards/CreateCompanyProfileCard';

function AdminDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div>
      <h1>Welcome Admin, {currentUser?.username}!</h1>
      <p>Your role: {currentUser?.roles.join(', ')}</p>
      <div style={styles.cardContainer}>
        <CreateUserProfileCard />
        <CreateCompanyProfileCard />  
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '100%',
    margin: '0 auto',
  }
};

export default AdminDashboard;

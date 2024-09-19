import {CSSProperties } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function SuperAdminDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div>
      <h1>Welcome Super Admin, {currentUser?.username}!</h1>
      <p>Your role: {JSON.stringify(currentUser?.roles)}</p>
      <div style={styles.cardContainer}>  
      </div>
    </div>
  );
}

const styles: { cardContainer: CSSProperties } = {
  cardContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '100%',
    margin: '0 auto',
  }
};
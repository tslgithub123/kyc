import { useEffect } from 'react';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useAuthStore } from '../../../store/store';
import LogoutButton from '../../ui/LogoutButton';


function EnvDashboard() {
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
      <h1>Welcome Env Officer, {currentUser?.username}!</h1>
      <p>Your role: {JSON.stringify(currentUser?.roles)}</p>
      <div>
        <LogoutButton/>
      </div>
    </div>
  );
}

export default EnvDashboard;

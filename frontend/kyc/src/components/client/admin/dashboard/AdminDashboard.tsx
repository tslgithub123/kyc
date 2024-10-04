import { useCurrentUser } from '../../../hooks/useCurrentUser';
import UserStatsWidget from './UserStatsWidget';
import CompanyStatsWidget from './CompanyStatsWidget';
import UnitWidget from './UnitWidget';
import TodoWidget from './TodoWidget';


function AdminDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser  ();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div>
      <UnitWidget/>
      <CompanyStatsWidget/>
      <TodoWidget/>
      <UserStatsWidget/>
      <h1>Welcome Admin, {currentUser?.username}!</h1>
      <p>Your role: {JSON.stringify(currentUser?.roles)}</p>
    </div>
  );
}



export default AdminDashboard;

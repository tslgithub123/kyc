import { useCurrentUser } from '../../../hooks/useCurrentUser';
import UserStatsWidget from './UserStatsWidget';
import CompanyStatsWidget from './CompanyStatsWidget';
import UnitWidget from './UnitWidget';
import TodoWidget from './TodoWidget';
import animate from '../../../ui/RenderAnimation.module.css';

function AdminDashboard() {
  const { data: currentUser, isLoading, error } = useCurrentUser  ();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <div className={animate['render-component']}>
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

import LoginPage from '../features/Login';
import AdminDashboard from '../features/TicketListing/components/AdminDashboard';
import UserDashboard from '../features/TicketListing/components/UserDashboard';
import { useAppSelector } from '../hooks/redux';
import useAuth from '../hooks/useAuth';
import type { RootState } from '../redux/store';

const Router = () => {
  const { user, role } = useAppSelector((state: RootState) => state.auth);
  useAuth(); // Initialize auth state
  console.log(user);

  if (!user) return <LoginPage />;
  return <div>{role === 'admin' ? <AdminDashboard /> : <UserDashboard />}</div>;
};

export default Router;

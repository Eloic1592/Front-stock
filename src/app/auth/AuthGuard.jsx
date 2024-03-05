import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/admin/connexion" state={{ from: pathname }} />;
};

export default AuthGuard;

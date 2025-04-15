import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children, requireAdmin = false }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
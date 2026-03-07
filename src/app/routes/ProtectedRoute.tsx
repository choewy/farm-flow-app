import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function ProtectedRoute({ 
  requireFarm = false, 
  requireAdmin = false,
  unauthenticatedRedirectTo = ROUTES.login
}: { 
  requireFarm?: boolean; 
  requireAdmin?: boolean;
  unauthenticatedRedirectTo?: string;
}) {
  const { user, farm, role } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={unauthenticatedRedirectTo} state={{ from: location }} replace />;
  }

  if (requireFarm && !farm) {
    return <Navigate to={ROUTES.farms} replace />;
  }

  if (requireAdmin && !role?.super) {
    // If not an admin, don't allow access, fall back to home
    return <Navigate to={ROUTES.home} replace />;
  }

  return <Outlet />;
}

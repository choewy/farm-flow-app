import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function ProtectedRoute({ requireFarm = false, requireAdmin = false }: { requireFarm?: boolean; requireAdmin?: boolean }) {
  const { user, farm, role } = useAuthStore();

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
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

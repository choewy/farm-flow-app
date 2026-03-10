import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PermissionKey } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function ProtectedRoute({
  requireFarm = false,
  requireAdmin = false,
  unauthenticatedRedirectTo = ROUTES.login,
  requirePermissionKeys = [],
}: {
  requireFarm?: boolean;
  requireAdmin?: boolean;
  unauthenticatedRedirectTo?: string;
  requirePermissionKeys?: PermissionKey[];
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
    return <Navigate to={ROUTES.home} replace />;
  }

  if (requirePermissionKeys?.length > 0 && !role?.permissionKeys.some((permissionKey) => requirePermissionKeys.includes(permissionKey))) {
    return <Navigate to={ROUTES.menu} replace />;
  }

  return <Outlet />;
}

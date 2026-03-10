import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PermissionKey } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function PermissionRoute({
  unauthenticatedRedirectTo = ROUTES.login,
  permissionKeys = [],
}: {
  unauthenticatedRedirectTo?: string;
  permissionKeys?: PermissionKey[];
}) {
  const { user, role } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={unauthenticatedRedirectTo} state={{ from: location }} replace />;
  }

  if (!role) {
    return <Navigate to={ROUTES.menu} replace />;
  }

  if (permissionKeys?.length > 0 && !role.permissionKeys.some((permissionKey) => permissionKeys.includes(permissionKey))) {
    return <Navigate to={ROUTES.menu} replace />;
  }

  return <Outlet />;
}

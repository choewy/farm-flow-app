import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function PublicOnlyRoute() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to={ROUTES.farms} replace />;
  }

  return <Outlet />;
}

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function PublicOnlyRoute() {
  const { user } = useAuthStore();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? ROUTES.farms;

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

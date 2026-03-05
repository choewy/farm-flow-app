import { type PropsWithChildren, useEffect } from 'react';

import { authApi } from '../api';

import { useAuthStore } from '@app/shared/stores';

export function AuthBootstrap({ children }: Readonly<PropsWithChildren>) {
  const { setSession, clearSession, setHydrated } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await authApi.refresh();

        if (!mounted) {
          return;
        }

        setSession(data.accessToken, data.user, data.farm, data.role);
      } catch {
        if (!mounted) {
          return;
        }

        clearSession();
      } finally {
        if (mounted) {
          setHydrated(true);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setSession, clearSession, setHydrated]);

  return <>{children}</>;
}

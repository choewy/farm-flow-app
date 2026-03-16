import { type PropsWithChildren, useEffect } from 'react';

import { authApi } from '../api';

import { useAuthStore } from '@app/shared/stores';

export function AuthBootstrap({ children }: Readonly<PropsWithChildren>) {
  const { setSession, clearSession, setHydrated, isHydrated } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await authApi.refresh();

        if (!mounted) {
          return;
        }

        setSession(data.user, data.farm, data.role);
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

  if (!isHydrated) {
    return <div className="flex min-h-dvh items-center justify-center bg-gray-50 text-sm text-gray-500" />;
  }

  return <>{children}</>;
}

import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Clock, ClockIcon, Home, HomeIcon, Menu, MenuIcon } from 'lucide-react';

import { GlobalHeader } from './GlobalHeader';

import { ROUTES } from '@app/shared/routes';

const NAV_ITEMS = [
  { name: '홈', path: ROUTES.home, icon: Home, activeIcon: HomeIcon },
  { name: '출퇴근', path: ROUTES.attendance, icon: Clock, activeIcon: ClockIcon },
  { name: '메뉴', path: ROUTES.menu, icon: Menu, activeIcon: MenuIcon },
];

export function GlobalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavPaths = [ROUTES.login, ROUTES.register] as string[];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    const frame = window.requestAnimationFrame(resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen px-3 pb-3 pt-[max(0.75rem, var(--safe-top))] text-slate-800 antialiased sm:px-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-white/30 to-transparent" />
      {shouldShowNav && <GlobalHeader />}

      <div className="mx-auto flex min-h-[calc(100vh-var(--safe-top)-0.75rem)] w-full max-w-md flex-col overflow-hidden rounded-4xl border border-white/45 bg-white/20 shadow-[0_24px_70px_rgba(41,43,23,0.16)] backdrop-blur-[6px]">
        <main className={`relative flex-1 w-full overflow-hidden ${shouldShowNav ? 'pt-20 pb-28' : 'pb-6 pt-4'}`}>
          <div className="absolute inset-0 bg-linear-to-b from-white/14 via-white/6 to-transparent" />
          <div className="relative p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Outlet />
          </div>
        </main>
      </div>

      {shouldShowNav && (
        <nav className="fixed inset-x-0 bottom-[max(0.75rem,var(--safe-bottom))] z-50 mx-auto w-full max-w-md px-4">
          <div className="grid grid-cols-3 gap-2 rounded-[1.75rem] border border-white/60 bg-[rgba(255,252,247,0.82)] p-2 shadow-[0_20px_40px_rgba(41,43,23,0.16)] backdrop-blur-2xl">
            {NAV_ITEMS.map((navItem) => {
              const isActive = location.pathname === navItem.path;
              const Icon = isActive ? navItem.activeIcon : navItem.icon;
              return (
                <button
                  key={navItem.name}
                  onClick={() => navigate(navItem.path)}
                  className={`relative flex flex-col items-center justify-center rounded-2xl py-2.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]'
                      : 'text-slate-400 hover:bg-white/45 hover:text-slate-700'
                  }`}
                >
                  <Icon className={`z-10 mb-1 h-5 w-5 ${isActive ? 'stroke-[2.25px]' : 'stroke-[1.8px]'}`} />
                  <span className="z-10 text-[10px] font-black tracking-[0.18em]">{navItem.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}

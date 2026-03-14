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

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <div className="mx-auto flex w-full max-w-md flex-col bg-slate-50 relative overflow-hidden">
        {shouldShowNav && <GlobalHeader />}

        <main className={`flex-1 w-full overflow-hidden ${shouldShowNav ? 'pt-16 pb-20' : ''}`}>
          <div className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Outlet />
          </div>
        </main>

        {shouldShowNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 z-50">
            {/* Safe area padding for iOS */}
            <div className="grid grid-cols-3 gap-1 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
              {NAV_ITEMS.map((navItem) => {
                const isActive = location.pathname === navItem.path;
                const Icon = isActive ? navItem.activeIcon : navItem.icon;
                return (
                  <button
                    key={navItem.name}
                    onClick={() => navigate(navItem.path)}
                    className={`relative flex flex-col items-center justify-center rounded-xl py-2 transition-all duration-200 active:bg-slate-50 ${
                      isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-1 z-10 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                    <span className="text-[10px] font-semibold z-10 tracking-wide">{navItem.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

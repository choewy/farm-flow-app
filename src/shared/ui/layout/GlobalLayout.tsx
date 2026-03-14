import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Clock, ClockIcon, Home, HomeIcon, Menu, MenuIcon } from 'lucide-react';

import { GlobalHeader } from './GlobalHeader';

import { ROUTES } from '@app/shared/routes';

export function GlobalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: '홈', path: ROUTES.home, icon: Home, activeIcon: HomeIcon },
    { name: '출퇴근', path: ROUTES.attendance, icon: Clock, activeIcon: ClockIcon },
    { name: '메뉴', path: ROUTES.menu, icon: Menu, activeIcon: MenuIcon },
  ];

  const hideNavPaths = [ROUTES.login, ROUTES.register] as string[];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <div className="mx-auto flex w-full max-w-md flex-col bg-slate-50 relative overflow-hidden">
        {shouldShowNav && <GlobalHeader />}

        <main className={`flex-1 w-full overflow-y-auto ${shouldShowNav ? 'pt-16 pb-24' : ''}`}>
          <div className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>

        {shouldShowNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%)] max-w-104 glass border border-white/40 shadow-premium-lg rounded-4xl p-2 z-50">
            <div className="grid grid-cols-3 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = isActive ? item.activeIcon : item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`relative flex flex-col items-center justify-center rounded-2xl py-3 transition-all duration-300 active:scale-90 ${
                      isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isActive && <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-in zoom-in-95 duration-300" />}
                    <Icon className={`w-6 h-6 mb-1 z-10 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    <span className={`text-[10px] font-bold z-10 tracking-tight`}>{item.name}</span>
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

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Clock, ClockIcon, Home, HomeIcon, Menu, MenuIcon } from 'lucide-react';

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
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="mx-auto flex w-full max-w-md flex-col bg-slate-50 relative">
        <main className="flex-1 w-full pb-24 overflow-y-auto">
          <Outlet />
        </main>

        {shouldShowNav && (
          <nav className="fixed bottom-0 w-full max-w-md rounded-t-3xl bg-white p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 z-50">
            <div className="grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = isActive ? item.activeIcon : item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center justify-center rounded-2xl p-2 transition w-full h-full ${
                      isActive ? 'bg-[#edf7e8] text-slate-800' : 'text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-medium">{item.name}</span>
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

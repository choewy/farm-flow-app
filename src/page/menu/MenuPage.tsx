import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, LayoutList, LogOut, QrCode, Settings, User, UserPlus } from 'lucide-react';

import { authApi } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function MenuPage() {
  const navigate = useNavigate();
  const { user, role, clearSession } = useAuthStore();

  const isAdmin = role?.super || (role?.permissions as string[]).includes('admin');

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        await authApi.logout();
      } catch (e) {
        console.error('Logout API failed', e);
      }
      clearSession();
    }
  };

  const menuSections = [
    {
      title: 'Common Services',
      items: [
        {
          name: '농장 목록',
          icon: LayoutList,
          path: ROUTES.farms,
          show: true,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
        },
      ],
    },
    {
      title: 'Attendance Management',
      items: [
        {
          name: '출퇴근 QR 생성',
          icon: QrCode,
          path: ROUTES.attendanceQrCode,
          show: isAdmin,
          color: 'text-primary',
          bgColor: 'bg-primary/10',
        },
        {
          name: '농장 초대',
          icon: UserPlus,
          path: ROUTES.invitation,
          show: isAdmin,
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-50',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          name: '알림 설정',
          icon: Bell,
          path: '#',
          show: true,
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
        },
        {
          name: '계정 설정',
          icon: Settings,
          path: '#',
          show: true,
          color: 'text-slate-500',
          bgColor: 'bg-slate-50',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col space-y-8 p-1">
      {/* Premium Profile Card */}
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-8 shadow-premium ring-1 ring-slate-100">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="relative flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-3xl bg-primary-light flex items-center justify-center text-primary border-4 border-white shadow-premium">
              <User size={48} className="stroke-[1.5px]" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary border-4 border-white shadow-sm" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{user?.name || '사용자'}</h2>
          <div className="mt-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
               {role?.name || '일반 사용자'}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-8 pb-10">
        {menuSections.map((section) => {
          const visibleItems = section.items.filter(item => item.show);
          if (visibleItems.length === 0) return null;
          
          return (
            <div key={section.title} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6 mb-3">
                {section.title}
              </h3>
              <div className="bg-white rounded-[2.5rem] shadow-premium ring-1 ring-slate-100 overflow-hidden">
                {visibleItems.map((item, idx, arr) => (
                  <button
                    key={item.name}
                    onClick={() => item.path !== '#' && navigate(item.path)}
                    className={`group w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all active:bg-slate-100 ${
                      idx !== arr.length - 1 ? 'border-b border-slate-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${item.bgColor} ${item.color} transition-transform group-hover:scale-110`}>
                        <item.icon size={22} className="stroke-2" />
                      </div>
                      <span className="font-bold text-slate-700 tracking-tight">{item.name}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Premium Logout Button */}
        <button
          onClick={handleLogout}
          className="group w-full flex items-center justify-between p-6 bg-white rounded-[2rem] shadow-premium ring-1 ring-slate-100 transition-all active:scale-[0.98] active:bg-red-50"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-red-50 text-red-500 transition-transform group-hover:rotate-12">
              <LogOut size={22} />
            </div>
            <span className="font-bold text-red-500 tracking-tight">로그아웃</span>
          </div>
          <p className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Session End</p>
        </button>
      </div>

      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Farm Flow v1.0.0 Alpha</p>
      </div>
    </div>
  );
}

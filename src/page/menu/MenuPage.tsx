import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  ChevronRight,
  LayoutList, 
  LogOut, 
  QrCode, 
  Scan, 
  Settings,
  User} from 'lucide-react';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function MenuPage() {
  const navigate = useNavigate();
  const { user, role, clearSession } = useAuthStore();

  const isAdmin = role?.super || role?.permissions.includes('admin');

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      clearSession();
      navigate(ROUTES.login);
    }
  };

  const menuSections = [
    {
      title: '서비스',
      items: [
        {
          name: '농장 목록',
          icon: LayoutList,
          path: ROUTES.farms,
          show: true,
        },
        {
          name: '출퇴근 QR 생성',
          icon: QrCode,
          path: ROUTES.attendanceQrCode,
          show: isAdmin,
        },
        {
          name: '출퇴근 스캔',
          icon: Scan,
          path: ROUTES.scan,
          show: !isAdmin,
        },
      ],
    },
    {
      title: '설정',
      items: [
        {
          name: '알림 설정',
          icon: Bell,
          path: '#',
          show: true,
        },
        {
          name: '계정 설정',
          icon: Settings,
          path: '#',
          show: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50 p-4 pb-20">
      {/* User Profile Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-100 mb-6 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-[#edf7e8] flex items-center justify-center text-[#8fcf72]">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">{user?.name || '사용자'}</h2>
          <p className="text-sm text-slate-500">{role?.name || '일반 사용자'}</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-2 mb-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
              {section.items.filter(item => item.show).map((item, idx, arr) => (
                <button
                  key={item.name}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition active:bg-slate-100 ${
                    idx !== arr.length - 1 ? 'border-b border-slate-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-slate-50 text-slate-600">
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-4 bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 text-red-500 hover:bg-red-50 transition active:bg-red-100"
        >
          <div className="p-2 rounded-xl bg-red-50 text-red-500">
            <LogOut size={20} />
          </div>
          <span className="font-medium">로그아웃</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">Farm Flow v1.0.0</p>
      </div>
    </div>
  );
}

import { LogOut } from 'lucide-react';

import { useMenuSectionProps } from '../hooks';

import { MenuSectionItem } from './MenuSectionItem';

import { authApi } from '@app/feature/auth';
import { useAuthStore } from '@app/shared/stores';

export function MenuSection() {
  const { role, clearSession } = useAuthStore();
  const menuSectionProps = useMenuSectionProps(role?.permissionKeys ?? []);

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

  return (
    <div className="space-y-8 pb-10">
      {menuSectionProps.map((props) => {
        const visibleItems = props.items.filter((item) => item.visible);

        if (visibleItems.length === 0) {
          return null;
        }

        return <MenuSectionItem {...props} />;
      })}

      <button
        onClick={handleLogout}
        className="group w-full flex items-center justify-between p-6 bg-white rounded-4xl shadow-premium ring-1 ring-slate-100 transition-all active:scale-[0.98] active:bg-red-50"
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
  );
}

import { LogOut } from 'lucide-react';

import { useMenuSectionProps } from '../hooks';

import { MenuSectionItem } from './MenuSectionItem';

import { useAuthStore } from '@app/shared/stores';

type MenuSectionProps = {
  openLogoutModal: () => void;
};

export function MenuSection({ openLogoutModal }: MenuSectionProps) {
  const { role } = useAuthStore();
  const menuSectionProps = useMenuSectionProps(role?.permissionKeys ?? []);

  return (
    <div className="space-y-8 pb-10">
      {menuSectionProps.map((props, i) => {
        const visibleItems = props.items.filter((item) => item.visible);

        if (visibleItems.length === 0) {
          return null;
        }

        return <MenuSectionItem key={`menu-section-${i}`} {...props} />;
      })}

      <button
        className="group w-full flex items-center justify-between p-6 bg-white rounded-4xl shadow-premium ring-1 ring-slate-100 transition-all active:scale-[0.98] active:bg-red-50"
        onClick={openLogoutModal}
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-red-50 text-red-500 transition-transform group-hover:scale-110">
            <LogOut size={22} className="stroke-2" />
          </div>
          <span className="font-bold text-red-500 tracking-tight">로그아웃</span>
        </div>
        <p className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Session End</p>
      </button>
    </div>
  );
}

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
    <div className="space-y-6 pb-10">
      {menuSectionProps.map((props, i) => {
        const visibleItems = props.items.filter((item) => item.visible);

        if (visibleItems.length === 0) {
          return null;
        }

        return <MenuSectionItem key={`menu-section-${i}`} {...props} />;
      })}

      <button
        className="app-card group flex w-full items-center justify-between p-5 transition-all active:scale-[0.98]"
        onClick={openLogoutModal}
      >
        <div className="flex items-center space-x-4">
          <div className="rounded-[1.1rem] bg-red-50 p-2.5 text-red-500 transition-transform group-hover:scale-110">
            <LogOut size={20} className="stroke-2" />
          </div>
          <span className="font-bold text-red-500 tracking-tight">로그아웃</span>
        </div>
        <p className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Session</p>
      </button>
    </div>
  );
}

import { User } from 'lucide-react';

import { useAuthStore } from '@app/shared/stores';

export function MenuUserProfile() {
  const { user, role, farm } = useAuthStore();

  return (
    <div className="app-hero px-6 py-6">
      <div className="relative z-10 flex items-start space-x-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-white/16 text-white backdrop-blur-sm">
          <User size={32} className="stroke-[1.5px]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="app-kicker text-white/70">Profile</p>
          <h2 className="mt-2 truncate text-[1.45rem] font-black tracking-[-0.04em] text-white">{user?.name || '사용자'}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="app-chip border-white/20 bg-white/16 text-white">{role?.name || '일반 사용자'}</span>
            <span className="app-chip border-white/20 bg-white/16 text-white">{farm?.name || '농장 선택 필요'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

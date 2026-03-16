import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Sprout, User } from 'lucide-react';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function MenuUserProfile() {
  const { user, role, farm } = useAuthStore();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(ROUTES.profile)}
      className="app-hero group w-full px-6 py-6 text-left transition-all active:scale-[0.99]"
    >
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.45rem] bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-sm">
          <span className="text-[1.7rem] font-black">{user?.name?.charAt(0) || <User size={28} className="stroke-[1.7px]" />}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="app-kicker text-white/72">My Profile</p>
            <span className="rounded-full border border-white/20 bg-white/12 px-2 py-0.5 text-[10px] font-black tracking-[0.18em] text-white/72">
              ACCOUNT
            </span>
          </div>
          <h2 className="mt-2 truncate text-[1.35rem] font-black tracking-[-0.04em] text-white">{user?.name || '사용자'}</h2>
          <p className="mt-1 truncate text-sm font-medium text-white/72">{user?.email || '이메일 정보 없음'}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="app-chip border-white/18 bg-white/14 text-white">
              <ShieldCheck size={14} />
              {role?.name || '일반 사용자'}
            </span>
            <span className="app-chip border-white/18 bg-white/14 text-white">
              <Sprout size={14} />
              {farm?.name || '농장 선택 필요'}
            </span>
          </div>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/16 text-white/90 transition-all group-hover:bg-white/22 group-hover:translate-x-0.5">
          <ChevronRight size={20} className="stroke-[2.25px]" />
        </div>
      </div>
    </button>
  );
}

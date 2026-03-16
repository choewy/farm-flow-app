import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

import { ROUTES } from '@app/shared/routes';

export type MemberHeaderProps = {
  total: number;
};

export function MemberHeader({ total }: MemberHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/40 bg-white/50 px-4 py-2 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">멤버 관리</span>
        <span className="text-xs font-bold text-slate-500">{total}명</span>
      </div>
      <button
        onClick={() => navigate(ROUTES.invitation)}
        className="flex items-center space-x-2 rounded-2xl bg-primary px-4 py-2 text-xs font-black text-white shadow-premium transition-all active:scale-95"
      >
        <UserPlus size={14} className="stroke-[3px]" />
        <span>초대하기</span>
      </button>
    </div>
  );
}

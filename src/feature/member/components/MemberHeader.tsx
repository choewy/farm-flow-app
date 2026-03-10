import { useNavigate } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';

import { ROUTES } from '@app/shared/routes';

export type MemberHeaderProps = {
  total: number;
};

export function MemberHeader({ total }: MemberHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Users size={24} />
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">멤버 관리</h2>
          <p className="text-lg font-bold text-slate-800">총 {total}명의 멤버</p>
        </div>
      </div>

      <button
        onClick={() => navigate(ROUTES.invitation)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
}

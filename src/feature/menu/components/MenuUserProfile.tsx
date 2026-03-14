import { User } from 'lucide-react';

import { useAuthStore } from '@app/shared/stores';

export function MenuUserProfile() {
  const { user, role } = useAuthStore();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-5">
      <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
        <User size={32} className="stroke-[1.5px]" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{user?.name || '사용자'}</h2>
        <div className="mt-1.5 inline-flex">
          <span className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 tracking-wider">
            {role?.name || '일반 사용자'}
          </span>
        </div>
      </div>
    </div>
  );
}

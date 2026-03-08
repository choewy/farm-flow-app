import { User } from 'lucide-react';

import { useAuthStore } from '@app/shared/stores';

export function MenuUserProfile() {
  const { user, role } = useAuthStore();

  return (
    <div className="relative overflow-hidden bg-white rounded-4xl p-8 shadow-premium ring-1 ring-slate-100">
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{role?.name || '일반 사용자'}</span>
        </div>
      </div>
    </div>
  );
}

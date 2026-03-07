import { useAuthStore } from '@app/shared/stores';

export function HomePage() {
  const { user, role } = useAuthStore();

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-white rounded-4xl p-8 shadow-premium ring-1 ring-slate-100">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center py-4">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-[2.5rem] bg-primary-light flex items-center justify-center text-primary border-4 border-white shadow-premium">
              <span className="text-4xl font-black">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Authenticated User</h2>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight text-center">
            안녕하세요, <br />
            <span className="text-primary">{user?.name || '사용자'}님</span>
          </h1>
          <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{role?.name || '일반 사용자'}</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">오늘의 한마디</h3>
          <p className="text-sm font-bold text-slate-600">오늘도 활기찬 하루 되세요!</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">✨</div>
      </div>
    </div>
  );
}

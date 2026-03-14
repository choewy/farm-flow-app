import { useAuthStore } from '@app/shared/stores';

export default function HomePage() {
  const { user, role } = useAuthStore();

  return (
    <div className="flex flex-col space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="text-2xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary border-2 border-white flex items-center justify-center" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-slate-400 mb-0.5">환영합니다</p>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            <span className="text-primary">{user?.name || '사용자'}님</span>
          </h1>
          <div className="mt-2 inline-flex">
            <span className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 tracking-wider">
              {role?.name || '일반 사용자'}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 tracking-wide mb-1">오늘의 한마디</h3>
          <p className="text-sm font-semibold text-slate-700">오늘도 활기찬 하루 되세요!</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-400">
          ✨
        </div>
      </div>
    </div>
  );
}

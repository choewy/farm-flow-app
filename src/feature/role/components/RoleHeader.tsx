import { Plus } from 'lucide-react';

export type RoleHeaderProps = {
  total: number;
  openCreateModal: () => void;
};

export function RoleHeader({ total, openCreateModal }: RoleHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/40 bg-white/50 px-4 py-2 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">역할 관리</span>
        <span className="text-xs font-bold text-slate-500">{total}개</span>
      </div>
      <button
        onClick={openCreateModal}
        className="flex items-center space-x-2 rounded-2xl bg-primary px-4 py-2 text-xs font-black text-white shadow-premium transition-all active:scale-95"
      >
        <Plus size={14} className="stroke-[3px]" />
        <span>새 역할 생성</span>
      </button>
    </div>
  );
}

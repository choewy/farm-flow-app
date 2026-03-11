import { Plus, Shield } from 'lucide-react';

export type RoleHeaderProps = {
  total: number;
  openCreateModal: () => void;
};

export function RoleHeader({ total, openCreateModal }: RoleHeaderProps) {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
          <Shield size={24} />
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">역할 관리</h2>
          <p className="text-lg font-bold text-slate-800">총 {total}개의 역할</p>
        </div>
      </div>

      <button
        onClick={openCreateModal}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

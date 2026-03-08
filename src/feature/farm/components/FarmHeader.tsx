import { Dispatch, SetStateAction } from 'react';
import { Plus } from 'lucide-react';

export type FarmHeaderProps = {
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
};

export function FarmHeader({ setIsCreateModalOpen }: FarmHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white/50 rounded-3xl border border-white/40 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">나의 농장 목록</span>
      </div>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-2xl text-xs font-black shadow-premium active:scale-95 transition-all"
      >
        <Plus size={14} className="stroke-[3px]" />
        <span>새 농장 생성</span>
      </button>
    </div>
  );
}

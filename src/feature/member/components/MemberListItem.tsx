import { Mail, Trash2, UserCog } from 'lucide-react';

import { MemberResponse } from '../api';

export type MemberItemProps = {
  row: MemberResponse;
  onEdit: (member: MemberResponse) => void;
  onDelete: (member: MemberResponse) => void;
};

export function MemberListItem({ row, onEdit, onDelete }: MemberItemProps) {
  return (
    <div className="group relative flex items-center justify-between rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:shadow-premium-lg active:scale-[0.99]">
      <div className="flex items-center space-x-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <span className="text-xl font-black">{row.user.name.charAt(0)}</span>
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-800">{row.user.name}</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                row.role.super ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {row.role.name}
            </span>
          </div>
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center text-slate-400 text-xs">
              <Mail size={12} className="mr-1" />
              {row.user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!row.role.super && (
          <>
            <button
              onClick={() => onEdit(row)}
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              title="권한 수정"
            >
              <UserCog size={20} />
            </button>
            <button
              onClick={() => onDelete(row)}
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              title="멤버 삭제"
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

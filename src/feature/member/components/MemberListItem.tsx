import { Mail, Trash2, UserCog } from 'lucide-react';

import { MemberResponse } from '../api';

export type MemberItemProps = {
  row: MemberResponse;
  onEdit: (member: MemberResponse) => void;
  onDelete: (member: MemberResponse) => void;
};

export function MemberListItem({ row, onEdit, onDelete }: MemberItemProps) {
  return (
    <div className="group relative flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.99]">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-lg transition-transform group-hover:scale-105">
          {row.user.name.charAt(0)}
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-slate-800">{row.user.name}</span>
            <span
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                row.role.super ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
              }`}
            >
              {row.role.name}
            </span>
          </div>
          <div className="flex items-center space-x-3 mt-0.5">
            <div className="flex items-center text-slate-400 text-xs font-medium">
              <Mail size={12} className="mr-1" />
              {row.user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {!row.role.super && (
          <>
            <button
              onClick={() => onEdit(row)}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary transition-all duration-200"
              title="권한 수정"
            >
              <UserCog size={18} />
            </button>
            <button
              onClick={() => onDelete(row)}
              className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              title="멤버 삭제"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

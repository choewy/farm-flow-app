import { Settings, Shield, Trash2 } from 'lucide-react';

import { Role } from '@app/shared/models';

export type RoleListItemProps = {
  row: Role;
  openUpdateModal(row: Role): void;
  openDeleteModal(row: Role): void;
};

export function RoleListItem({ row, openUpdateModal, openDeleteModal }: RoleListItemProps) {
  const superRoleClassName = row.super ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary';

  return (
    <div className="group relative flex items-center justify-between rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:shadow-premium-lg active:scale-[0.99]">
      <div className="flex items-center space-x-5">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-4xl ${superRoleClassName} transition-transform group-hover:scale-105`}
        >
          <Shield size={32} />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-800">{row.name}</span>
            {row.super && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-wider">
                ADMIN
              </span>
            )}
            {row.required && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                REQUIRED
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1 font-medium">권한 {row.permissionKeys.length}개 보유</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!row.required && (
          <>
            <button
              title="역할 수정"
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              onClick={() => openUpdateModal(row)}
            >
              <Settings size={20} />
            </button>
            <button
              title="역할 삭제"
              className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              onClick={() => openDeleteModal(row)}
            >
              <Trash2 size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

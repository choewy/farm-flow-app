import { MouseEvent } from 'react';
import { Settings, Shield, Trash2 } from 'lucide-react';

import { Role } from '@app/shared/models';

export type RoleListItemProps = {
  row: Role;
  openDetailModal(row: Role): void;
  openUpdateModal(row: Role): void;
  openDeleteModal(row: Role): void;
};

export function RoleListItem({ row, openDetailModal, openUpdateModal, openDeleteModal }: RoleListItemProps) {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    switch (e.currentTarget.id) {
      case 'role-update-modal':
        openUpdateModal(row);
        break;

      case 'role-remove-modal':
        openDeleteModal(row);
        break;

      default:
        openDetailModal(row);
    }
  };

  return (
    <div
      className="group relative flex items-center justify-between rounded-2xl bg-white p-4 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.99]"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-transform`}
        >
          <Shield size={24} />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-slate-800">{row.name}</span>
            {row.super && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                ADMIN
              </span>
            )}
            {row.required && (
              <span className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                REQUIRED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">권한 {row.permissionKeys.length}개 보유</p>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {!row.required && (
          <>
            <button
              id="role-update-button"
              title="역할 수정"
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary transition-all duration-200"
              onClick={handleClick}
            >
              <Settings size={18} />
            </button>
            <button
              id="role-remove-button"
              title="역할 삭제"
              className="p-2 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              onClick={handleClick}
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

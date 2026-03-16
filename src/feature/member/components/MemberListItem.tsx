import { Mail, Trash2, UserCog } from 'lucide-react';

import { Formatter } from '@app/shared/helpers';
import { Member, PermissionKey } from '@app/shared/models';
import { useAuthStore } from '@app/shared/stores';

export type MemberItemProps = {
  row: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
};

export function MemberListItem({ row, onEdit, onDelete }: MemberItemProps) {
  const role = useAuthStore((state) => state.role);
  const permissionKeys = role?.permissionKeys ?? [];
  const canEdit =
    !row.role.super &&
    permissionKeys.some((permissionKey) => [PermissionKey.MemberRoleUpdate, PermissionKey.MemberPayUpdate].includes(permissionKey));
  const canDelete = !row.role.super && permissionKeys.includes(PermissionKey.MemberRemove);

  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.99]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center space-x-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary transition-transform group-hover:scale-105">
            {row.user.name.charAt(0)}
          </div>
          <div className="min-w-0 text-left">
            <div className="flex items-center space-x-2">
              <span className="truncate text-base font-bold text-slate-800">{row.user.name}</span>
              <span
                className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  row.role.super
                    ? 'border border-amber-100 bg-amber-50 text-amber-600'
                    : 'border border-slate-100 bg-slate-50 text-slate-500'
                }`}
              >
                {row.role.name}
              </span>
            </div>
            <div className="mt-0.5 flex items-center text-xs font-medium text-slate-400">
              <Mail size={12} className="mr-1 shrink-0" />
              <span className="truncate">{row.user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center space-x-1">
          {canEdit && (
            <button
              onClick={() => onEdit(row)}
              className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-50 hover:text-primary"
              title="멤버 정보 수정"
            >
              <UserCog size={18} />
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(row)}
              className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
              title="멤버 삭제"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {!row.role.super && role?.permissionKeys?.includes(PermissionKey.MemberPayUpdate) && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-2.5 text-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">시급</span>
            <span className="text-right font-extrabold text-slate-800">{Formatter.toMoney(row.payRatePerHour)}원</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-2.5 text-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">월 공제액</span>
            <span className="text-right font-extrabold text-slate-800">{Formatter.toMoney(row.payDeductionAmount)}원</span>
          </div>
        </div>
      )}
    </div>
  );
}

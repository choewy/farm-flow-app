import { Shield } from 'lucide-react';

import { Role } from '@app/shared/models';

export type MemberUpdateModalRoleListItemProps = {
  role: Role;
  selectedRoleId: string;
  setSelectedRoleId: (roleId: string) => void;
};

export function MemberUpdateModalRoleListItem({ role, selectedRoleId, setSelectedRoleId }: MemberUpdateModalRoleListItemProps) {
  const selectedRoleClassName =
    selectedRoleId === role.id ? 'border-primary/50 bg-primary/5 shadow-[0_8px_20px_rgba(14,165,233,0.08)]' : 'border-slate-200 bg-white hover:border-slate-300';

  return (
    <button
      type="button"
      onClick={() => setSelectedRoleId(role.id)}
      className={`flex w-full items-center justify-between rounded-2xl border px-3.5 py-3 transition-all duration-200 ${selectedRoleClassName}`}
    >
      <div className="flex items-center space-x-2.5">
        <div
          className={`rounded-xl p-1.5 ${selectedRoleId === role.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}
        >
          <Shield size={16} />
        </div>
        <div className="text-left">
          <span className={`block text-sm font-bold ${selectedRoleId === role.id ? 'text-slate-800' : 'text-slate-500'}`}>{role.name}</span>
        </div>
      </div>
      {selectedRoleId === role.id && <div className="h-2 w-2 rounded-full bg-primary" />}
    </button>
  );
}

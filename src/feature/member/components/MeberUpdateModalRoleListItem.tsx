import { Dispatch, SetStateAction } from 'react';
import { Shield } from 'lucide-react';

import { Role } from '@app/shared/models';

export type MemberUpdateModalRoleListItemProps = {
  role: Role;
  selectedRoleId: string;
  setSelectedRoleId: Dispatch<SetStateAction<string>>;
};

export function MemberUpdateModalRoleListItem({ role, selectedRoleId, setSelectedRoleId }: MemberUpdateModalRoleListItemProps) {
  const selectedRoleClassName =
    selectedRoleId === role.id ? 'border-primary bg-primary/5' : 'border-slate-50 bg-white hover:border-slate-200';

  return (
    <button
      onClick={() => setSelectedRoleId(role.id)}
      className={`w-full flex items-center justify-between p-4 rounded-3xl border-2 transition-all duration-200 ${selectedRoleClassName}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl ${selectedRoleId === role.id ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
          <Shield size={18} />
        </div>
        <div className="text-left">
          <span className={`block font-bold ${selectedRoleId === role.id ? 'text-slate-800' : 'text-slate-500'}`}>{role.name}</span>
        </div>
      </div>
      {selectedRoleId === role.id && <div className="h-2 w-2 rounded-full bg-primary" />}
    </button>
  );
}

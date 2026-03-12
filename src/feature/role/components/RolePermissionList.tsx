import { CheckCircle2, Circle } from 'lucide-react';

import { PERMISSION_LABEL_ENTRIES, PermissionKey } from '@app/shared/models';

export type RolePermissionListProps = {
  permissionKeys: PermissionKey[];
  onClickHandler: (permissionKey: PermissionKey) => void;
  readOnly?: boolean;
};

export function RolePermissionList({ permissionKeys, onClickHandler, readOnly }: RolePermissionListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
      {PERMISSION_LABEL_ENTRIES.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onClickHandler(key)}
          disabled={readOnly}
          className={`flex items-center justify-between px-4 py-2 rounded-2xl border-2 transition-all duration-200 ${
            permissionKeys.includes(key)
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-slate-50 bg-white text-slate-400 hover:border-slate-200'
          }`}
        >
          <span className={`font-bold ${permissionKeys.includes(key) ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
          {permissionKeys.includes(key) ? (
            <CheckCircle2 size={20} className="text-primary" />
          ) : (
            <Circle size={20} className="text-slate-200" />
          )}
        </button>
      ))}
    </div>
  );
}

import { CheckCircle2, Circle } from 'lucide-react';

import { PERMISSION_LABEL_MAP, PermissionGroup } from '../constants';

import { PermissionKey } from '@app/shared/models';

export type RolePermissionGroupItemListProps = {
  isOpen: boolean;
  permissionKeys: PermissionKey[];
  group: PermissionGroup;
  onClickHandler: (permissionKey: PermissionKey) => void;
  readOnly?: boolean;
};

export function RolePermissionGroupItemList({ isOpen, permissionKeys, group, onClickHandler, readOnly }: RolePermissionGroupItemListProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="mt-5 grid grid-cols-1 gap-2">
      {group.keys.map((key) => {
        const label = PERMISSION_LABEL_MAP.get(key);

        if (!label) {
          return null;
        }

        const isSelected = permissionKeys.includes(key);

        return (
          <button
            key={key}
            type="button"
            onClick={() => onClickHandler(key)}
            disabled={readOnly}
            className={`flex items-center justify-between rounded-xl border px-3 py-2 transition-all duration-200 ${
              isSelected
                ? 'border-primary/20 bg-white text-primary shadow-[0_8px_18px_rgba(20,184,166,0.08)]'
                : 'border-transparent bg-white/90 text-slate-400 hover:border-slate-200'
            } ${readOnly ? 'cursor-default' : ''}`}
          >
            <span className={`text-[11px] ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
            {isSelected ? <CheckCircle2 size={17} className="text-primary" /> : <Circle size={17} className="text-slate-200" />}
          </button>
        );
      })}
    </div>
  );
}

import { useState } from 'react';
import { CheckCircle2, ChevronDown, Circle } from 'lucide-react';

import { PERMISSION_LABEL_ENTRIES, PermissionKey } from '@app/shared/models';

const PERMISSION_GROUPS: { title: string; keys: PermissionKey[] }[] = [
  {
    title: '농장 운영',
    keys: [PermissionKey.InvitationCreate, PermissionKey.AttendanceQrCreate],
  },
  {
    title: '역할 관리',
    keys: [PermissionKey.RoleRead, PermissionKey.RoleCreate, PermissionKey.RoleUpdate, PermissionKey.RoleRemove],
  },
  {
    title: '멤버 관리',
    keys: [PermissionKey.MemberRead, PermissionKey.MemberRoleUpdate, PermissionKey.MemberRemove],
  },
];

const PERMISSION_LABEL_MAP = new Map<PermissionKey, string>(PERMISSION_LABEL_ENTRIES);

export type RolePermissionListProps = {
  permissionKeys: PermissionKey[];
  onClickHandler: (permissionKey: PermissionKey) => void;
  readOnly?: boolean;
};

export function RolePermissionList({ permissionKeys, onClickHandler, readOnly }: RolePermissionListProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(PERMISSION_GROUPS.map((group) => [group.title, true])),
  );

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="space-y-3">
      {PERMISSION_GROUPS.map((group) => (
        <section key={group.title} className="rounded-[1.4rem] border border-slate-100 bg-slate-50/70 p-3">
          <button
            type="button"
            onClick={() => toggleGroup(group.title)}
            className="flex w-full items-center justify-between px-1 text-left"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{group.title}</span>
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-300 transition-transform duration-200 ${openGroups[group.title] ? 'rotate-180' : ''}`}
            />
          </button>

          {openGroups[group.title] && (
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
          )}
        </section>
      ))}
    </div>
  );
}

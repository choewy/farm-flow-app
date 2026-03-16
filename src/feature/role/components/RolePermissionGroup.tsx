import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { PermissionGroup } from '../constants';

import { RolePermissionGroupItemList } from './RolePermissionGroupItemList';

import { PermissionKey } from '@app/shared/models';

export type RolePermissionGroupProps = {
  permissionKeys: PermissionKey[];
  group: PermissionGroup;
  onClickHandler: (permissionKey: PermissionKey) => void;
  readOnly?: boolean;
};

export function RolePermissionGroup({ group, permissionKeys, onClickHandler, readOnly }: RolePermissionGroupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <section key={group.title} className="rounded-[1.4rem] border border-slate-100 bg-slate-50/70 p-3">
      <button type="button" className="flex w-full items-center justify-between px-1 text-left" onClick={() => setIsOpen((prev) => !prev)}>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{group.title}</span>
        </span>
        <ChevronDown className={`text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      <RolePermissionGroupItemList
        isOpen={isOpen}
        group={group}
        permissionKeys={permissionKeys}
        onClickHandler={onClickHandler}
        readOnly={readOnly}
      />
    </section>
  );
}

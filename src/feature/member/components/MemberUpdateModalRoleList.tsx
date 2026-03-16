import { useEffect, useState } from 'react';

import { MemberUpdateModalRoleListItem } from './MemberUpdateModalRoleListItem';

import { roleApi } from '@app/feature/role';
import { Role } from '@app/shared/models';

export type MemberUpdateModalRoleListProps = {
  selectedRoleId: string;
  setSelectedRoleId: (roleId: string) => void;
};

export function MemberUpdateModalRoleList({ selectedRoleId, setSelectedRoleId }: MemberUpdateModalRoleListProps) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    roleApi.list().then(({ data }) => setRoles(data.rows));
  }, []);

  return (
    <div className="space-y-2.5">
      {roles.map((role) => (
        <MemberUpdateModalRoleListItem key={role.id} role={role} selectedRoleId={selectedRoleId} setSelectedRoleId={setSelectedRoleId} />
      ))}
    </div>
  );
}

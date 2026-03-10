import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { MemberUpdateModalRoleListItem } from './MeberUpdateModalRoleListItem';

import { roleApi } from '@app/feature/role';
import { Role } from '@app/shared/models';

export type MemberUpdateModalRoleListProps = {
  selectedRoleId: string;
  setSelectedRoleId: Dispatch<SetStateAction<string>>;
};

export function MemberUpdateModalRoleList({ selectedRoleId, setSelectedRoleId }: MemberUpdateModalRoleListProps) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    roleApi.list().then(({ data }) => setRoles(data.rows));
  }, []);

  return (
    <>
      {roles.map((role) => (
        <MemberUpdateModalRoleListItem key={role.id} role={role} selectedRoleId={selectedRoleId} setSelectedRoleId={setSelectedRoleId} />
      ))}
    </>
  );
}

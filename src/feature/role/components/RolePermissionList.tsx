import { PERMISSION_GROUPS } from '../constants';

import { RolePermissionGroup } from './RolePermissionGroup';

import { PermissionKey } from '@app/shared/models';

export type RolePermissionListProps = {
  permissionKeys: PermissionKey[];
  onClickHandler: (permissionKey: PermissionKey) => void;
  readOnly?: boolean;
};

export function RolePermissionList({ permissionKeys, onClickHandler, readOnly }: RolePermissionListProps) {
  return (
    <div className="space-y-3">
      {PERMISSION_GROUPS.map((group) => (
        <RolePermissionGroup
          key={group.title}
          group={group}
          permissionKeys={permissionKeys}
          onClickHandler={onClickHandler}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}

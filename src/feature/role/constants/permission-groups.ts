import { PermissionGroup } from './types';

import { PermissionKey } from '@app/shared/models';

export const PERMISSION_GROUPS: PermissionGroup[] = [
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

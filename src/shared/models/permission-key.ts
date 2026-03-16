export enum PermissionKey {
  InvitationCreate = 'invitation.create',
  AttendanceQrCreate = 'attendance.qr.create',
  FarmUpdate = 'farm.update',
  FarmDelete = 'farm.delete',
  RoleRead = 'role.read',
  RoleCreate = 'role.create',
  RoleUpdate = 'role.update',
  RoleRemove = 'role.remove',
  MemberRead = 'member.read',
  MemberRoleUpdate = 'member.role.update',
  MemberPayUpdate = 'member.pay.update',
  MemberRemove = 'member.remove',
}

export const PERMISSION_LABEL: Partial<Record<PermissionKey, string>> = {
  [PermissionKey.InvitationCreate]: '농장 초대',
  [PermissionKey.AttendanceQrCreate]: '출퇴근 QR 생성',
  [PermissionKey.RoleRead]: '역할 조회',
  [PermissionKey.RoleCreate]: '역할 생성',
  [PermissionKey.RoleUpdate]: '역할 수정',
  [PermissionKey.RoleRemove]: '역할 삭제',
  [PermissionKey.MemberRead]: '멤버 조회',
  [PermissionKey.MemberRoleUpdate]: '멤버 권한 관리',
  [PermissionKey.MemberPayUpdate]: '멤버 급여 관리',
  [PermissionKey.MemberRemove]: '멤버 삭제',
};

export const PERMISSION_LABEL_ENTRIES = Object.entries(PERMISSION_LABEL) as [PermissionKey, string][];

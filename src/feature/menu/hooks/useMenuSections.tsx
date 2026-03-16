import { Bell, QrCode, Settings, ShieldCheck, Sprout, Ticket, UserPlus, UsersRound, Wallet } from 'lucide-react';

import { MenuSectionProps } from '../types';

import { PermissionKey } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';

export function useMenuSectionProps(permissionKeys: PermissionKey[]): MenuSectionProps[] {
  return [
    {
      title: 'Common Services',
      items: [
        {
          name: '내 농장 목록',
          icon: Sprout,
          path: ROUTES.farms,
          visible: true,
          color: 'text-emerald-600',
          background: 'bg-emerald-50',
        },
        {
          name: '초대코드 입력',
          icon: Ticket,
          path: ROUTES.invitationAccept,
          visible: true,
          color: 'text-cyan-600',
          background: 'bg-cyan-50',
        },
      ],
    },
    {
      title: 'Farm Services',
      items: [
        {
          name: '출퇴근 QR 생성',
          icon: QrCode,
          path: ROUTES.attendanceQrCode,
          visible: permissionKeys.includes(PermissionKey.AttendanceQrCreate),
          color: 'text-violet-600',
          background: 'bg-violet-50',
        },
        {
          name: '멤버 초대',
          icon: UserPlus,
          path: ROUTES.invitation,
          visible: permissionKeys.includes(PermissionKey.InvitationCreate),
          color: 'text-sky-600',
          background: 'bg-sky-50',
        },
        {
          name: '역할 관리',
          icon: ShieldCheck,
          path: ROUTES.roles,
          visible: permissionKeys.some((permissionKey) =>
            [PermissionKey.RoleRead, PermissionKey.RoleCreate, PermissionKey.RoleUpdate, PermissionKey.RoleRemove].includes(permissionKey),
          ),
          color: 'text-amber-600',
          background: 'bg-amber-50',
        },
        {
          name: '멤버 관리',
          icon: UsersRound,
          path: ROUTES.members,
          visible: permissionKeys.some((permissionKey) =>
            [PermissionKey.MemberRead, PermissionKey.MemberRoleUpdate, PermissionKey.MemberPayUpdate, PermissionKey.MemberRemove].includes(
              permissionKey,
            ),
          ),
          color: 'text-blue-600',
          background: 'bg-blue-50',
        },
        {
          name: '급여 정산',
          icon: Wallet,
          path: ROUTES.payrolls,
          visible: permissionKeys.includes(PermissionKey.PayrollRead),
          color: 'text-emerald-700',
          background: 'bg-emerald-50',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          name: '알림 설정',
          icon: Bell,
          path: '#',
          visible: false,
          color: 'text-amber-500',
          background: 'bg-amber-50',
        },
        {
          name: '계정 설정',
          icon: Settings,
          path: ROUTES.profile,
          visible: false,
          color: 'text-slate-500',
          background: 'bg-slate-50',
        },
      ],
    },
  ];
}

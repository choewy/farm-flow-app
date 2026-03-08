import { Bell, LayoutList, QrCode, Settings, UserPlus } from 'lucide-react';

import { MenuSectionProps } from '../types';

import { PermissionKey } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';

export function useMenuSectionProps(permissionKeys: PermissionKey[]): MenuSectionProps[] {
  return [
    {
      title: 'Common Services',
      items: [
        {
          name: '농장 목록',
          icon: LayoutList,
          path: ROUTES.farms,
          visible: true,
          color: 'text-blue-500',
          background: 'bg-blue-50',
        },
        {
          name: '농장 초대',
          icon: UserPlus,
          path: ROUTES.invitation,
          visible: permissionKeys.includes(PermissionKey.InvitationCreate),
          color: 'text-indigo-500',
          background: 'bg-indigo-50',
        },
        {
          name: '출퇴근 QR 생성',
          icon: QrCode,
          path: ROUTES.attendanceQrCode,
          visible: permissionKeys.includes(PermissionKey.AttendanceQrCreate),
          color: 'text-primary',
          background: 'bg-primary/10',
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
          visible: true,
          color: 'text-amber-500',
          background: 'bg-amber-50',
        },
        {
          name: '계정 설정',
          icon: Settings,
          path: '#',
          visible: true,
          color: 'text-slate-500',
          background: 'bg-slate-50',
        },
      ],
    },
  ];
}

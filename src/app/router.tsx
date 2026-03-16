import { createBrowserRouter } from 'react-router-dom';

import { PermissionRoute, ProtectedRoute, PublicOnlyRoute } from './routes';

import { AttendancePage, AttendanceQrCodePage } from '@app/page/attendance';
import { FarmListPage } from '@app/page/farm';
import { HomePage } from '@app/page/home';
import { InvitationAcceptPage, InvitationPage } from '@app/page/invitation';
import { LoginPage } from '@app/page/login';
import { MemberPage } from '@app/page/member';
import { MenuPage } from '@app/page/menu';
import { ProfilePage } from '@app/page/profile';
import { RegisterPage } from '@app/page/register';
import { RolePage } from '@app/page/role';
import { PermissionKey } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';
import { AppRouteError } from '@app/shared/ui/error';
import { GlobalLayout } from '@app/shared/ui/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    errorElement: <AppRouteError />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          { path: ROUTES.login, element: <LoginPage /> },
          { path: ROUTES.register, element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute requireFarm={false} unauthenticatedRedirectTo={ROUTES.login} />,
        children: [
          { path: ROUTES.menu, element: <MenuPage /> },
          { path: ROUTES.profile, element: <ProfilePage /> },
          { path: ROUTES.farms, element: <FarmListPage /> },
          { path: ROUTES.invitationAccept, element: <InvitationAcceptPage /> },
        ],
      },
      {
        element: <ProtectedRoute requireFarm={true} />,
        children: [
          { path: ROUTES.home, element: <HomePage /> },
          { path: ROUTES.attendance, element: <AttendancePage /> },
          {
            path: ROUTES.invitation,
            element: <PermissionRoute permissionKeys={[PermissionKey.InvitationCreate]} />,
            children: [{ index: true, element: <InvitationPage /> }],
          },
          {
            path: ROUTES.attendanceQrCode,
            element: <PermissionRoute permissionKeys={[PermissionKey.AttendanceQrCreate]} />,
            children: [{ index: true, element: <AttendanceQrCodePage /> }],
          },
          {
            path: ROUTES.members,
            element: (
              <PermissionRoute
                permissionKeys={[PermissionKey.MemberRead, PermissionKey.MemberRoleUpdate, PermissionKey.MemberPayUpdate, PermissionKey.MemberRemove]}
              />
            ),
            children: [{ index: true, element: <MemberPage /> }],
          },
          {
            path: ROUTES.roles,
            element: (
              <PermissionRoute
                permissionKeys={[PermissionKey.RoleRead, PermissionKey.RoleCreate, PermissionKey.RoleUpdate, PermissionKey.RoleRemove]}
              />
            ),
            children: [{ index: true, element: <RolePage /> }],
          },
        ],
      },
      { path: '*', element: <div className="p-8 text-center text-gray-500">페이지를 찾을 수 없습니다.</div> },
    ],
  },
]);

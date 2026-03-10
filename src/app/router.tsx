import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute, PublicOnlyRoute } from './routes';

import { AttendancePage, AttendanceQrCodePage } from '@app/page/attendance';
import { FarmListPage } from '@app/page/farm';
import { HomePage } from '@app/page/home';
import { InvitationAcceptPage, InvitationPage } from '@app/page/invitation';
import { LoginPage } from '@app/page/login';
import { MenuPage } from '@app/page/menu';
import { RegisterPage } from '@app/page/register';
import { ROUTES } from '@app/shared/routes';
import { GlobalLayout } from '@app/shared/ui/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
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
          { path: ROUTES.farms, element: <FarmListPage /> },
          { path: ROUTES.invitationAccept, element: <InvitationAcceptPage /> },
        ],
      },
      {
        element: <ProtectedRoute requireFarm={true} />,
        children: [
          { path: ROUTES.home, element: <HomePage /> },
          { path: ROUTES.attendance, element: <AttendancePage /> },
          { path: ROUTES.invitation, element: <InvitationPage /> },
          {
            element: <ProtectedRoute requireAdmin={true} />,
            children: [{ path: ROUTES.attendanceQrCode, element: <AttendanceQrCodePage /> }],
          },
        ],
      },
      { path: '*', element: <div className="p-8 text-center text-gray-500">페이지를 찾을 수 없습니다.</div> },
    ],
  },
]);

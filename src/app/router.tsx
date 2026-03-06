import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute, PublicOnlyRoute } from './routes';

import { AttendanceQrCodePage } from '@app/page/attendance';
import { FarmListPage } from '@app/page/farm';
import { HomePage } from '@app/page/home';
import { LoginPage } from '@app/page/login';
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
        element: <ProtectedRoute requireFarm={false} />,
        children: [{ path: ROUTES.farms, element: <FarmListPage /> }],
      },
      {
        element: <ProtectedRoute requireFarm={true} />,
        children: [
          { path: ROUTES.home, element: <HomePage /> },
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

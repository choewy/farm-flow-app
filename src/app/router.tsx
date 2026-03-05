import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '@app/page/login';
import { RegisterPage } from '@app/page/register';
import { ROUTES } from '@app/shared/routes';

export const router = createBrowserRouter([
  { path: ROUTES.home, element: <div>Home Page</div> },
  { path: ROUTES.login, element: <LoginPage /> },
  { path: ROUTES.register, element: <RegisterPage /> },
  { path: '*', element: <div>Not Found Page</div> },
]);

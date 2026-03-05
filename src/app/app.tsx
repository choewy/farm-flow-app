import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import { AuthBootstrap } from '@app/feature/auth';

export function App() {
  return (
    <AuthBootstrap>
      <RouterProvider router={router} />
    </AuthBootstrap>
  );
}

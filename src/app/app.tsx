import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import { AuthBootstrap } from '@app/feature/auth';
import { AppErrorBoundary } from '@app/shared/ui/error';

export function App() {
  return (
    <AppErrorBoundary>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeButton={false}
        limit={1}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        draggable={false}
        theme="light"
        className="app-toast-container"
        toastClassName={(context) => `app-toast app-toast-${context?.type ?? 'default'}`}
      />
      <AuthBootstrap>
        <RouterProvider router={router} />
      </AuthBootstrap>
    </AppErrorBoundary>
  );
}

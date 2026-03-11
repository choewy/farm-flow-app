import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import { AuthBootstrap } from '@app/feature/auth';

export function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeButton={true}
        limit={1}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <AuthBootstrap>
        <RouterProvider router={router} />
      </AuthBootstrap>
    </>
  );
}

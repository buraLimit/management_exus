import GuestGuard from 'utils/route-guard/GuestGuard';
import { Outlet } from 'react-router-dom';
import AuthLogin from 'pages/auth/login';

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <Outlet />
        </GuestGuard>
      ),
      children: [
        {
          path: '/',
          element: <AuthLogin />
        },
        {
          path: 'login',
          element: <AuthLogin />
        }
      ]
    }
  ]
};

export default LoginRoutes;

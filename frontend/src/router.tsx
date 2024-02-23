import { createBrowserRouter } from 'react-router-dom';

import { DeliveryPage } from './pages/DeliveryPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { MainLayout } from './layouts/MainLayout';
import { CreateDeliveryPage } from './pages/CreateDeliveryPage';
import { DeliveryDetail } from './pages/DeliveryDetail';
import { RegisterPage } from './pages/RegiterPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ActivatePage } from './pages/ActivatePage';
import { RecoverPasswordPage } from './pages/RecoverPasswordPage';
import { RequestRecoverPassword } from './pages/RequestRecoverPassword';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { DepartmentCreatePage } from './pages/DepartmentCreatePage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { authService } from './services/authService';
import { deliveryService } from './services/deliveryService';

const { getItem, setItem } = useLocalStorage();
const accessToken = getItem('access');

const checkAuth = async () => {
  if (accessToken) {
    const res = await authService.me().then((user) => user.is_staff);
    setItem('isStaff', `${res}`);
    return res;
  }
  return null;
};
const checkUserDeliveries = async () => {
  const res = await deliveryService.getUserDeliveries();
  if (accessToken && !res.receiving[0] && !res.sending[0]) {
    setItem('userDeliveries', 'false');
    return false;
  }
  setItem('userDeliveries', 'true');

  return true;
};

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: accessToken ? <ProfilePage /> : <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
        loader: checkAuth,
      },
      {
        path: 'departments/:id',
        element: <DepartmentDetailPage />,
      },
      {
        path: 'departments/create',
        element: <DepartmentCreatePage />,
      },
      {
        path: 'deliveries',
        element: <DeliveryPage />,
      },
      {
        path: 'deliveries/:id',
        element: <DeliveryDetail />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: checkUserDeliveries,
      },
      {
        path: 'profile/delivery/create',
        element: <CreateDeliveryPage />,
      },
      {
        path: 'profile/delivery/:id',
        element: <DeliveryDetail />,
      },
    ],
  },
  {
    path: 'activate/:token',
    element: <ActivatePage />,
  },
  {
    path: 'recover/:recoveryToken',
    element: <RecoverPasswordPage />,
  },
  {
    path: 'request/recover',
    element: <RequestRecoverPassword />,
  },
  {
    path: 'email/check-page/',
    element: <CheckEmailPage />,
  },
  {
    path: 'email/check-page/:new_email',
    element: <CheckEmailPage />,
  },
]);

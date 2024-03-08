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
import { AdminPage } from './pages/AdminPage';
import { UserComponent } from './components/UsersComponent';
import { AdminDeliveries } from './components/AdminDeliveries';
import { ProfileInspectPage } from './pages/ProfileInspectPage';

const { getItem, setItem } = useLocalStorage();
const accessToken = getItem('access');

const checkAuth = async () => {
  const user = await authService.me().then((user) => user);
  const userDeliveries = await deliveryService.getUserDeliveries(user.id);

  const showDeliveries =
    !!userDeliveries.data.receiving[0] || !!userDeliveries.data.sending[0];

  showDeliveries
    ? setItem('userDeliveries', 'true')
    : setItem('userDeliveries', 'false');

  setItem('isStaff', `${user.is_staff}`);
  setItem('id', `${user.id}`);
  setItem('email', `${user.email}`);

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
        path: 'deliveries/:deliveryId',
        element: <DeliveryDetail />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: checkAuth,
      },
      {
        path: 'profile/delivery/create',
        element: <CreateDeliveryPage />,
      },
      {
        path: 'profile/delivery/:id',
        element: <DeliveryDetail />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'admin/users',
        element: <UserComponent />,
      },
      {
        path: 'admin/users/:id',
        element: <ProfileInspectPage />,
      },
      {
        path: 'admin/users/:userId/delivery/:deliveryId',
        element: <DeliveryDetail />,
      },

      {
        path: 'admin/deliveries',
        element: <AdminDeliveries />,
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

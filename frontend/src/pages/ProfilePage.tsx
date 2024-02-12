import { authService } from '../services/authService';
import { ProfileCard } from '../components/ProfileCard';
import { useEffect, useState } from 'react';
import { UserDeliveries } from '../components/UserDeliveries';
import { useFetch } from '../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './styles/ProfilePage.module.css';
import button from './styles/DeliveryPage.module.css';
import { PleaseLogin } from '../components/PleaseLogin';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePage } from '../store/store';

const ProfilePage = () => {
  const refreshPage = usePage((state) => state.refresh);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getItem } = useLocalStorage();
  const [showUserDeliveries, setShowUserDeliveries] = useState(false);
  const accessToken = getItem('access');

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useFetch(authService.profile.profile(), ['profile']);

  useEffect(() => {
    refetch();
    if (pathname === '/') navigate('/profile');
  }, [pathname, refetch, refreshPage]);

  if (error) return <h1>{error?.message}</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!accessToken) return <PleaseLogin />;

  return (
    <div className={css.profileContainer}>
      <h1>Profile</h1>
      <hr />
      {profile && <ProfileCard profile={profile} />}
      <button
        className={button.button}
        onClick={() => navigate('delivery/create')}
      >
        Send delivery
      </button>
      <button
        className={button.button}
        onClick={() => setShowUserDeliveries((prev) => !prev)}
      >
        My deliveries
      </button>
      {showUserDeliveries && <UserDeliveries />}
    </div>
  );
};

export { ProfilePage };

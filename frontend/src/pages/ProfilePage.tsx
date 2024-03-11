import { authService } from '../services/authService';
import { ProfileCard } from '../components/ProfileCard';
import { useEffect, useState } from 'react';
import { UserDeliveries } from '../components/UserDeliveries';
import { useFetch } from '../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './styles/ProfilePage.module.css';
import button from './styles/DeliveryPage.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePage } from '../store/store';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getItem } = useLocalStorage();

  const [showUserDeliveries, setShowUserDeliveries] = useState(false);
  const refreshPage = usePage((state) => state.refresh);
  const setNavRefresh = usePage((state) => state.setNavRefresh);

  const userDeliveries = getItem('userDeliveries');
  const userId = getItem('id');

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useFetch(authService.profile.profile(userId ? +userId : 0), ['profile']);

  useEffect(() => {
    if (pathname === '/') navigate('/profile');
    refetch();
    setNavRefresh();
  }, [pathname, refetch, refreshPage]);

  if (error) return <h1>{error?.message}</h1>;
  if (isLoading) return <h1>Loading...</h1>;

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
      {userDeliveries === 'true' && (
        <>
          <button
            className={button.button}
            onClick={() => setShowUserDeliveries((prev) => !prev)}
          >
            My deliveries
          </button>
          {showUserDeliveries && <UserDeliveries />}
        </>
      )}
    </div>
  );
};

export { ProfilePage };

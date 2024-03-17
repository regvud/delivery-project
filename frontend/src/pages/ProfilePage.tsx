import { authService } from '../services/authService';
import { ProfileCard } from '../components/ProfileCard';
import { useEffect, useId, useState } from 'react';
import { UserDeliveries } from '../components/UserDeliveries';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './styles/ProfilePage.module.css';
import button from './styles/DeliveryPage.module.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePage } from '../store/store';
import { AxiosError } from 'axios';
import { useFetchTest } from '../hooks/useFetch';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getItem } = useLocalStorage();

  //states
  const [showUserDeliveries, setShowUserDeliveries] = useState(false);
  const refreshPage = usePage((state) => state.refresh);
  const setNavRefresh = usePage((state) => state.setNavRefresh);
  const [error, setError] = useState<AxiosError | unknown>();

  const userDeliveries = getItem('userDeliveries');
  const userId = getItem('id') ?? 0;

  const {
    data: profile,
    refetch,
    isLoading,
  } = useFetchTest(fetchProfile, ['profile']);

  useEffect(() => {
    if (pathname === '/') navigate('/profile');
    refetch();
    setNavRefresh();
  }, [userId, refreshPage, setNavRefresh]);

  async function fetchProfile() {
    try {
      const profile = await authService.profile.profile(+userId);
      return profile.data;
    } catch (e) {
      const err = e as AxiosError;
      setError(err.response?.data);
      return null;
    }
  }

  if (isLoading) return <h1>...Loading</h1>;
  if (error) return <h1>{`${error}`}</h1>;

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

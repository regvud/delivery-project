import { authService } from '../services/authService';
import { ProfileCard } from '../components/ProfileCard';
import { useState } from 'react';
import { UserDeliveries } from '../components/UserDeliveries';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import css from './styles/ProfilePage.module.css';
import { PleaseLogin } from '../components/PleaseLogin';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const [showUserDeliveries, setShowUserDeliveries] = useState(false);
  const token = getItem('access');

  if (token) {
    const {
      data: profile,
      error,
      isLoading,
    } = useFetch(authService.profile(), ['profile']);
    if (error) return <h1>{error?.message}</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    return (
      <div className={css.profileContainer}>
        <h1>Profile</h1>
        <hr />
        {profile && <ProfileCard profile={profile} />}
        <button onClick={() => navigate('delivery/create')}>
          Send delivery
        </button>
        <button onClick={() => setShowUserDeliveries((prev) => !prev)}>
          My deliveries
        </button>
        {showUserDeliveries && <UserDeliveries />}
      </div>
    );
  }

  return <PleaseLogin />;
};

export { ProfilePage };

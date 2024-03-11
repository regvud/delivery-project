import { User } from '../types/userTypes';
import css from './styles/UserCard.module.css';
import button from '../pages/styles/DeliveryPage.module.css';
import { userService } from '../services/userService';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isUserActive, setIsUserActive] = useState<boolean>(user.is_active);
  const [msg, setMsg] = useState(false);
  const { getItem } = useLocalStorage();
  const userEmail = getItem('email');

  const handleClick = async () => {
    if (user.email === userEmail) {
      setMsg(true);
      return;
    }
    setIsDisabled(true);
    try {
      const { status } = await userService.patchUser(user.id, {
        dataType: 'IsActive',
        is_active: !isUserActive,
      });
      if (status === 200) setIsUserActive(!isUserActive);
    } catch (e) {
      const err = e as AxiosError;
      console.log(err);
    }
    setIsDisabled(false);
  };

  const handleNavigation = () => navigate(`${user.id}`);

  return (
    <div
      className={css.userContainer}
      style={{ backgroundColor: isUserActive ? '#40826D' : '#F33A6A' }}
    >
      <span style={{ cursor: 'pointer' }} onClick={handleNavigation}>
        {user.id}
      </span>
      <span style={{ cursor: 'pointer' }} onClick={handleNavigation}>
        {user.email}
      </span>
      <span>{isUserActive ? 'Active' : 'Blocked'}</span>
      {msg ? (
        <span
          style={{
            width: 250,
            height: 63,
            color: 'orange',
          }}
        >
          You cannot deactivate yourself
        </span>
      ) : (
        <button
          disabled={isDisabled}
          className={button.button}
          style={{ width: 250 }}
          onClick={handleClick}
        >
          {isUserActive ? 'Deactivate user' : 'Activate user'}
        </button>
      )}
    </div>
  );
};

export { UserCard };

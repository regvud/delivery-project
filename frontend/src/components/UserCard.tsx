import { User } from '../types/userTypes';
import css from './styles/UserCard.module.css';
import button from '../pages/styles/DeliveryPage.module.css';
import { userService } from '../services/userService';
import { useState } from 'react';
import { AxiosError } from 'axios';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isUserActive, setIsUserActive] = useState<boolean>(user.is_active);

  const handleClick = async () => {
    setIsDisabled(true);
    try {
      const { status } = await userService.patchUser(user.id, {
        is_active: !isUserActive,
      });
      if (status === 200) setIsUserActive(!isUserActive);
    } catch (e) {
      const err = e as AxiosError;
      console.log(err);
    }
    setIsDisabled(false);
  };

  return (
    <div className={css.userContainer}>
      <span>{user.id}</span>
      <span>{user.email}</span>
      <span>{isUserActive ? 'Active' : 'Blocked'}</span>
      <button
        disabled={isDisabled}
        className={button.button}
        onClick={handleClick}
      >
        {isUserActive ? 'Deactivate user' : 'Activate user'}
      </button>
    </div>
  );
};

export { UserCard };

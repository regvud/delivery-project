import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authService } from '../services/authService';
import { useEffect, useState } from 'react';
import css from './styles/CheckEmailPage.module.css';
import button from './styles/DeliveryPage.module.css';

const CheckEmailPage = () => {
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const { new_email } = useParams();
  const [error, setError] = useState(false);

  const storageEmail = getItem('newEmail');

  const changeEmail = async () => {
    if (storageEmail === new_email) {
      const { status } = await authService.profile.changeEmail(new_email);
      status === 200 ? navigate('/profile') : setError(true);
    }
    setError(true);
  };

  useEffect(() => {
    if (storageEmail) changeEmail();
  }, []);

  if (error)
    return (
      <div className={css.container}>
        <h1>Something went wrong, try again.</h1>
        <button className={button.button} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    );
  return (
    <div className={css.container}>
      {storageEmail === new_email ? (
        <h1>Changing email</h1>
      ) : (
        <h1>Check your email for account confirmation.</h1>
      )}
    </div>
  );
};

export { CheckEmailPage };

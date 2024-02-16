import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate, useParams } from 'react-router-dom';
import button from './styles/DeliveryPage.module.css';
import css from './styles/CheckEmailPage.module.css';

const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const activateUser = async (token: string) => {
    const { data } = await authService.activate(token);
    return data;
  };

  useEffect(() => {
    if (token) {
      activateUser(token);
    }
  }, []);

  return (
    <>
      {token ? (
        <div className={css.container}>
          <h1>User is activated</h1>
          <button className={button.button} onClick={() => navigate('/login')}>
            LOGIN
          </button>
        </div>
      ) : (
        <div className={css.container}>
          <h1>No token provided</h1>
        </div>
      )}
    </>
  );
};

export { ActivatePage };

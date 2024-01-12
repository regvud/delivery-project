import { useNavigate } from 'react-router-dom';
import css from './styles/PleaseLogin.module.css';

const PleaseLogin = () => {
  const navigate = useNavigate();

  return (
    <div className={css.pleaseLogin}>
      <h1>You have to login first</h1>
      <button className={css.button} onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
};

export { PleaseLogin };

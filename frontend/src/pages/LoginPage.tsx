import { SubmitHandler, useForm } from 'react-hook-form';
import { UserLogin } from '../types/userTypes';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import css from './styles/LoginPage.module.css';
import { ResponseError } from '../types/axiosTypes';

const LoginPage = () => {
  const { register, handleSubmit } = useForm<UserLogin>();
  const [error, setError] = useState<ResponseError>();
  const [, setRefresh] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('access');

  const submit: SubmitHandler<UserLogin> = async (user) => {
    try {
      const { data, request } = await authService.login(user);

      if (request.status === 200) {
        localStorage.setItem('access', data.access);
        navigate('/profile');
      }
      setError(JSON.parse(request.response));
    } catch (e) {
      console.log(`unknow error:   ${e}}`);
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    setRefresh((prev) => !prev);
  };

  if (token)
    return (
      <div className={css.loggedInStyles}>
        <h1>
          Currently, you are logged in. Press the button if you want to logout.
        </h1>
        <button onClick={logout} className={css.logoutButtonStyles}>
          Logout
        </button>
      </div>
    );

  return (
    <>
      <h1 className={css.welcomeStyles}>
        Welcome! You have to login to use all the features.
      </h1>
      <form className={css.formStyles} onSubmit={handleSubmit(submit)}>
        <h4 style={{ color: 'red', margin: 0 }}>{error?.detail}</h4>

        {error?.email}
        <input
          type="text"
          placeholder="email"
          className={css.inputStyles}
          {...register('email')}
        />

        {error?.password}
        <input
          type="password"
          placeholder="password"
          className={css.inputStyles}
          {...register('password')}
        />
        <button type="submit" className={css.buttonStyles}>
          Login
        </button>
      </form>
    </>
  );
};

export { LoginPage };

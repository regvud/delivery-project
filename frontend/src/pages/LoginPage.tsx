import { SubmitHandler, useForm } from 'react-hook-form';
import { UserLogin } from '../types/userTypes';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import css from './styles/LoginPage.module.css';
import { ResponseError } from '../types/axiosTypes';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LoginPage = () => {
  const { register, handleSubmit } = useForm<UserLogin>();
  const [error, setError] = useState<ResponseError>();
  const navigate = useNavigate();
  const setNavbarRefresh = usePage((state) => state.setRefresh);

  const submit: SubmitHandler<UserLogin> = async (user) => {
    try {
      const {
        data: { access },
        request,
      } = await authService.login(user);

      if (request.status === 200) {
        const { setItem } = useLocalStorage();
        setItem('access', access);

        setNavbarRefresh();
        navigate('/profile');
      }
      setError(JSON.parse(request.response));
    } catch (e) {
      console.log(`unknow error:   ${e}}`);
    }
  };

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

import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './styles/LoginPage.module.css';
import button from './styles/DeliveryPage.module.css';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

const schema = z.object({
  email: z.string().email('Enter your email'),
  password: z.string().min(1, 'Enter your password'),
});

type UserLoginSchema = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const setNavbarRefresh = usePage((state) => state.setRefresh);
  const { setItem } = useLocalStorage();

  const { pathname } = useLocation();

  const clearStorage = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('isStaff');
    localStorage.removeItem('newEmail');
    localStorage.removeItem('userDeliveries');
  };

  useEffect(() => {
    clearStorage();
    setNavbarRefresh();

    if (pathname === '/') {
      navigate('/login');
    }
  }, [pathname]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLoginSchema>({ resolver: zodResolver(schema) });

  const submit: SubmitHandler<UserLoginSchema> = async (user) => {
    try {
      const {
        data,
        request: { status },
      } = await authService.login(user);

      if (status === 200) {
        setItem('access', data?.access);
        setItem('refresh', data?.refresh);

        setNavbarRefresh();

        navigate('/profile');
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err.response?.status === 401) {
        setError('root', {
          message: `Incorrect email or password, may be you haven't activated your account with email.`,
        });
      } else {
        setError('root', { message: `unknown error: ${e}` });
      }
    }
  };

  return (
    <form className={css.formStyles} onSubmit={handleSubmit(submit)}>
      <h1>Login</h1>
      <hr />

      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="text"
        placeholder="email"
        className={css.inputStyles}
        {...register('email')}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input
        type="password"
        placeholder="password"
        className={css.inputStyles}
        {...register('password')}
      />
      {errors.root && <span>{errors.root.message}</span>}
      <button type="submit" className={button.button} style={{ width: '100%' }}>
        Login
      </button>
      <button
        className={css.forgotPassBtn}
        onClick={() => navigate('/request/recover')}
      >
        Forgot password?
      </button>
    </form>
  );
};

export { LoginPage };

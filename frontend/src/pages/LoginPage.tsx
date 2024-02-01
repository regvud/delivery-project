import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import css from './styles/LoginPage.module.css';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthResponse } from '../types/axiosTypes';

const schema = z.object({
  email: z.string().email('Email example: user@gmail.com'),
  password: z.string(),
});

type UserLoginSchema = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLoginSchema>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const setNavbarRefresh = usePage((state) => state.setRefresh);
  const { setItem } = useLocalStorage();

  const submit: SubmitHandler<UserLoginSchema> = async (user) => {
    try {
      const { data, request }: AuthResponse = await authService.login(user);

      if (request?.status === 200) {
        setItem('access', data?.access);
        setItem('refresh', data?.refresh);

        setNavbarRefresh();
        navigate('/profile');
      }

      if (request?.status === 401) {
        setError('root', {
          message: `Incorrect email or password, may be you haven't activated your account with email.`,
        });
      }
    } catch (e) {
      setError('root', { message: `unknown error: ${e}` });
    }
  };

  return (
    <>
      <h1 className={css.welcomeStyles}>
        Welcome! You have to login to use all the features.
      </h1>
      <form className={css.formStyles} onSubmit={handleSubmit(submit)}>
        {errors.email && (
          <h4 className="text-red-500">{errors.email.message}</h4>
        )}
        <input
          type="text"
          placeholder="email"
          className={css.inputStyles}
          {...register('email', { required: 'Email is required' })}
        />

        <input
          type="password"
          placeholder="password"
          className={css.inputStyles}
          {...register('password', { required: 'Password is required' })}
        />

        {errors.root && <h4>{errors.root.message}</h4>}

        <button type="submit" className={css.buttonStyles}>
          Login
        </button>
        <button
          className={css.forgotPassBtn}
          onClick={() => navigate('/request/recover')}
        >
          Forgot password?
        </button>
      </form>
    </>
  );
};

export { LoginPage };

import { SubmitHandler, useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import css from './styles/LoginPage.module.css';
import { ResponseError } from '../types/axiosTypes';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Email example: user@gmail.com'),
  password: z.string().min(8, 'Password must have at least 8 symbols'),
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

  const submit: SubmitHandler<UserLoginSchema> = async (user) => {
    try {
      const { data, request } = await authService.login(user);

      if (request.status === 200) {
        const { setItem } = useLocalStorage();
        setItem('access', data?.access);

        setNavbarRefresh();
        navigate('/profile');
      }

      if (request.status === 401) {
        const response: ResponseError = JSON.parse(request.response);

        setError('root', {
          message: response.detail,
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
        {/* <h4 style={{ color: 'red', margin: 0 }}>{error?.detail}</h4> */}

        {errors.email && (
          <h4 className="text-red-500">{errors.email.message}</h4>
        )}
        <input
          type="text"
          placeholder="email"
          className={css.inputStyles}
          {...register('email', { required: 'Email is required' })}
        />

        {errors.password && (
          <h4 className="text-red-500">{errors.password.message}</h4>
        )}
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
      </form>
    </>
  );
};

export { LoginPage };

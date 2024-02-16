import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import css from './styles/RegisterPage.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResponseError } from '../types/axiosTypes';
import { useState } from 'react';
import button from './styles/DeliveryPage.module.css';

export const phoneRegex = new RegExp(/^3?8?(0\d{9})$/);

const schema = z.object({
  email: z.string().email('Email example: user@gmail.com'),
  phone: z.string().regex(phoneRegex, 'Phone format: 380632503425'),
  password: z.string().min(8, 'Password must have at least 8 symbols'),
  validation_password: z
    .string()
    .min(8, 'Password must have at least 8 symbols'),
});

type UserRegisterSchema = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<UserRegisterSchema> = async (user) => {
    if (getValues('password') === getValues('validation_password')) {
      try {
        setLoader(true);
        const { request } = await authService.register(user);

        if (request.status === 201) {
          navigate('/email/check-page');
        }

        if (request.status == 400) {
          const response: ResponseError = JSON.parse(request.response);

          setError('root', {
            message: response.email || response.password || response.phone,
          });
        }
      } catch (e) {
        setError('root', { message: `unknown error: ${e}` });
      } finally {
        setLoader(false);
      }
    } else
      setError('validation_password', { message: 'Passwords should match' });
  };

  if (loader) return <h1 style={{ textAlign: 'center' }}>Processing</h1>;

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={css.form}>
        <h1>Registration</h1>
        <hr />

        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          className={css.input}
          type="text"
          placeholder="email"
          {...register('email', { required: 'Email is required' })}
        />

        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
        <input
          type="text"
          placeholder="phone"
          {...register('phone', { required: 'Phone is required' })}
          className={css.input}
        />

        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="password"
          {...register('password', {
            required: 'Password is required',
          })}
          className={css.input}
        />

        {errors.validation_password && (
          <span className="text-red-500">
            {errors.validation_password.message}
          </span>
        )}
        <input
          type="password"
          placeholder="repeat password"
          {...register('validation_password', {
            required: 'Password is required',
          })}
          className={css.input}
        />

        {errors.root && <span>{errors.root.message}</span>}

        <button className={button.button} style={{ width: '100%' }}>
          Register
        </button>
      </form>
    </>
  );
};

export { RegisterPage };

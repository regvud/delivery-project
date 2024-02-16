import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authService } from '../services/authService';
import { useState } from 'react';
import button from '../pages/styles/DeliveryPage.module.css';
import css from '../pages/styles/LoginPage.module.css';

const schema = z.object({
  email: z.string().email('Email example: user@gmail.com'),
});

type EmailSchema = z.infer<typeof schema>;

const RequestRecoverPassword = () => {
  const [msg, setMsg] = useState();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<EmailSchema> = async ({ email }) => {
    try {
      setLoader(true);
      const { status, data } = await authService.recoverRequest(email);

      if (status === 202) {
        setMsg(data);
      }
    } catch (e) {
      setError('root', { message: `unknown error: ${e}` });
    } finally {
      setLoader(false);
    }
  };

  if (loader) return <h1 style={{ textAlign: 'center' }}>Please wait..</h1>;
  if (msg)
    return (
      <h2 style={{ textAlign: 'center' }}>Confirm your email to continue</h2>
    );

  return (
    <form className={css.formStyles} onSubmit={handleSubmit(submit)}>
      <h2>Enter your account email: </h2>
      {errors.email && <h4 className="text-red-500">{errors.email.message}</h4>}

      <input className={css.inputStyles} type="text" {...register('email')} />
      <button className={button.button} style={{ width: '100%' }}>
        send
      </button>

      {errors.root && <h4 className="text-red-500">{errors.root.message}</h4>}
    </form>
  );
};

export { RequestRecoverPassword };

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
  const [msg, setMsg] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<EmailSchema> = async ({ email }) => {
    await authService.recoverRequest(email);
    setMsg(true);
  };
  console.log(msg);
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
      <button style={{ width: '100%' }} className={button.button}>
        send
      </button>

      {errors.root && <h4 className="text-red-500">{errors.root.message}</h4>}
    </form>
  );
};

export { RequestRecoverPassword };

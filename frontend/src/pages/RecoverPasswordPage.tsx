import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from '../hooks/useLocalStorage';

const schema = z.object({
  password: z.string().min(8, 'Password must have at least 8 symbols'),
  confirm_password: z.string().min(8, 'Password must have at least 8 symbols'),
});

type PassswordSchema = z.infer<typeof schema>;
type ErrorMessage = { password: string[] };

const RecoverPasswordPage = () => {
  const { recoveryToken } = useParams();
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage();
  removeItem('access');

  const {
    handleSubmit,
    register,
    getValues,
    setError,
    formState: { errors },
  } = useForm<PassswordSchema>({ resolver: zodResolver(schema) });

  const submit: SubmitHandler<PassswordSchema> = async ({ password }) => {
    if (
      recoveryToken &&
      getValues('password') === getValues('confirm_password')
    ) {
      try {
        const { status, request } = await authService.recover(
          password,
          recoveryToken
        );

        if (status === 202) {
          navigate('/login');
        }

        const msg: ErrorMessage = JSON.parse(request.response);

        setError('password', { message: `${msg.password[0]}` });
      } catch (e) {
        setError('root', {
          message: 'Invalid or expired token, please try again.',
        });
      }
    } else setError('confirm_password', { message: 'Passwords should match' });
  };

  if (!recoveryToken) return <h1>Invalid token</h1>;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>Recover Password</h1>

      <label>
        New Password
        <input
          type="password"
          {...register('password', { required: true })}
        ></input>
      </label>
      {errors.password && (
        <h4 className="text-red-500">{errors.password.message}</h4>
      )}

      <label>
        Confirm Password
        <input
          type="password"
          {...register('confirm_password', { required: true })}
        ></input>
      </label>
      {errors.confirm_password && (
        <h4 className="text-red-500">{errors.confirm_password.message}</h4>
      )}

      {!errors.root && <button>save</button>}

      {errors.root && (
        <div>
          <h4 className="text-red-500">{errors.root.message}</h4>
          <button onClick={() => navigate('/login')}>try again</button>
        </div>
      )}
    </form>
  );
};

export { RecoverPasswordPage };

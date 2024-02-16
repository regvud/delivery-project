import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authService } from '../services/authService';
import { useState } from 'react';

const CheckEmailPage = () => {
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const { new_email } = useParams();
  const [error, setError] = useState(false);

  const storageEmail = getItem('newEmail');

  const changeEmail = async () => {
    if (storageEmail === new_email) {
      const { status } = await authService.profile.changeEmail(new_email);
      status === 200 ? navigate('/profile') : setError(true);
    }
  };
  changeEmail();

  if (error)
    return (
      <h1 style={{ textAlign: 'center' }}>Something went wrong, try again.</h1>
    );
  return (
    <>
      {storageEmail === new_email ? (
        <h1 style={{ textAlign: 'center' }}>Changing email</h1>
      ) : (
        <h1 style={{ textAlign: 'center' }}>
          Check your email for account confirmation.
        </h1>
      )}
    </>
  );
};

export { CheckEmailPage };

import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate, useParams } from 'react-router-dom';

const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      authService.activate(token);
    }
  }, []);

  return (
    <>
      {token ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>User is activated</h1>
          <button style={{ width: '15%' }} onClick={() => navigate('/login')}>
            LOGIN
          </button>
        </div>
      ) : (
        <h1>No token provided</h1>
      )}
    </>
  );
};

export { ActivatePage };

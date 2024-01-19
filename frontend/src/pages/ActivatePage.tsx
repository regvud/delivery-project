import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useParams } from 'react-router-dom';

const ActivatePage = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      authService.activate(token);
    }
  }, []);

  return <>{token ? <h1>User is activated</h1> : <h1>No token provided</h1>}</>;
};

export { ActivatePage };

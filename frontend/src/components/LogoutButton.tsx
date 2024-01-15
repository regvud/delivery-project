import { useNavigate } from 'react-router-dom';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LogoutButton = () => {
  const navigate = useNavigate();
  const navbarRefresh = usePage((state) => state.setRefresh);

  function logout() {
    const { removeItem } = useLocalStorage();
    removeItem('access');

    navbarRefresh();
    navigate('/login');
  }

  return <button onClick={logout}>Logout</button>;
};

export { LogoutButton };

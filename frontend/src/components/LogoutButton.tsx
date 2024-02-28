import { useNavigate } from 'react-router-dom';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LogoutButton = () => {
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();
  const refresh = usePage((state) => state.setRefresh);

  function logout() {
    removeItem('access');

    refresh();
    navigate('/login');
  }

  return (
    <button style={{ width: 80, height: 45 }} onClick={logout}>
      Logout
    </button>
  );
};

export { LogoutButton };

import { NavLink } from 'react-router-dom';
import css from './styles/Navbar.module.css';
import { LogoutButton } from './LogoutButton';
import { useEffect, useState } from 'react';
import { usePage } from '../store/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Navbar = () => {
  const { getItem } = useLocalStorage();
  const [token, setToken] = useState(getItem('access'));
  const refresh = usePage((state) => state.refresh);
  const navRefresh = usePage((state) => state.navRefresh);

  const isLoggedUserStaff = getItem('isStaff');

  useEffect(() => {
    setToken(getItem('access'));
  }, [navRefresh, refresh]);

  if (!token)
    return (
      <div className={css.navbar}>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );

  return (
    <div className={css.navbar}>
      {isLoggedUserStaff && isLoggedUserStaff === 'true' && (
        <NavLink to="/admin">Admin</NavLink>
      )}
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/deliveries">Deliveries</NavLink>
      <NavLink to="/departments">Departments</NavLink>
      <LogoutButton />
    </div>
  );
};

export { Navbar };

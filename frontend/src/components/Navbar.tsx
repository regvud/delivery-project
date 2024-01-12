import { NavLink } from 'react-router-dom';
import css from './styles/Navbar.module.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className={css.navbar}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/deliveries">Deliveries</NavLink>
    </div>
  );
};

export { Navbar };

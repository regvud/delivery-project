import { NavLink } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
      <NavLink to={'users'}>Users</NavLink>
      <NavLink to={'deliveries'}>Deliveries</NavLink>
      <NavLink to={'statistics'}>Statistics</NavLink>
    </>
  );
};

export { AdminPage };

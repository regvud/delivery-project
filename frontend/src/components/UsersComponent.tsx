import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';

export const UsersComponent = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useFetch(userService.getAll(), ['getAllUserList']);

  if (isLoading) return <>...Loading</>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h3>ID</h3>
        <h3>EMAIL</h3>
        <h3>STATUS</h3>
        <h3>ACTION</h3>
      </div>
      {users?.results?.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};

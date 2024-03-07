import { User } from '../types/userTypes';

interface ProfileInspectCardProps {
  user: User;
}

export const ProfileInspectCard = ({ user }: ProfileInspectCardProps) => {
  return (
    <div>
      <h3>{user.id}</h3>
      <h3>{user.email}</h3>
      <h3>{user.phone}</h3>
      <h3>is_active: {user.is_active ? 'true' : 'false'}</h3>
      <h3>is_staff: {user.is_staff ? 'true' : 'false'}</h3>
      <h3>is_superuser: {user.is_superuser ? 'true' : 'false'}</h3>
      <h3>{user.updated_at}</h3>
      <h3>{user.created_at}</h3>
    </div>
  );
};

import { Profile } from '../types/userTypes';

interface ProfileProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileProps) => {
  const lastLogin: string = new Date(profile.last_login).toLocaleDateString(
    'es-CL'
  );

  return (
    <>
      <h3>Email: {profile.email}</h3>
      <h3>Phone: {profile.phone}</h3>
      <h3>Last login: {lastLogin}</h3>
    </>
  );
};

export { ProfileCard };

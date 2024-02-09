import { Profile } from '../types/userTypes';
import css from './styles/ProfileCard.module.css';
interface ProfileProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileProps) => {
  const lastLogin: string = new Date(profile.last_login).toLocaleDateString(
    'es-CL'
  );

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <img
        className={css.profileImage}
        src={profile.avatar[0].avatar}
        onClick={handleImageClick}
      />
      <h3>Email: {profile.email}</h3>
      <h3>Phone: {profile.phone}</h3>
      <h3>Last login: {lastLogin}</h3>
    </>
  );
};

export { ProfileCard };

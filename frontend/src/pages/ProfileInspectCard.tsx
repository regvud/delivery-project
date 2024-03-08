import { DeliveryMapComponent } from '../components/DeliveryMapComponent';
import { Delivery } from '../types/deliveryTypes';
import { User } from '../types/userTypes';
import css from './styles/ProfileInspectCard.module.css';
interface ProfileInspectCardProps {
  user: User;
  receiving: Delivery[] | undefined;
  sending: Delivery[] | undefined;
}

export const ProfileInspectCard = ({
  user,
  receiving,
  sending,
}: ProfileInspectCardProps) => {
  const created_at = new Date(user.created_at).toUTCString();
  const updated_at = new Date(user.updated_at).toUTCString();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className={css.main}>
        <h4>ID: {user.id}</h4>
        <h4>Email: {user.email}</h4>
        <h4>User phone: {user.phone}</h4>
        <h4>Is_active: {user.is_active ? 'true' : 'false'}</h4>
        <h4>Is_staff: {user.is_staff ? 'true' : 'false'}</h4>
        <h4>Is_superuser: {user.is_superuser ? 'true' : 'false'}</h4>
        <h4>Updated: {updated_at}</h4>
        <h4>Created: {created_at}</h4>
      </div>
      <div>
        {receiving && receiving?.length !== 0 && (
          <DeliveryMapComponent
            array={receiving}
            key={user.id}
            title="Receiving"
          />
        )}
        {sending && sending?.length !== 0 && (
          <DeliveryMapComponent array={sending} key={user.id} title="Sending" />
        )}
      </div>
    </div>
  );
};

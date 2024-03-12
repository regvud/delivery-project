import { AxiosError } from 'axios';
import { DeliveryMapComponent } from '../components/DeliveryMapComponent';
import { userService } from '../services/userService';
import { Delivery } from '../types/deliveryTypes';
import { PatchData, User } from '../types/userTypes';
import css from './styles/ProfileInspectCard.module.css';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
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
  const { getItem } = useLocalStorage();

  const created_at = new Date(user.created_at).toUTCString();
  const updated_at = new Date(user.updated_at).toUTCString();

  const [statusActive, setStatusActive] = useState(user.is_active);
  const [statusStaff, setStatusStaff] = useState(user.is_staff);
  const [statusSuperuser, setStatusSuperuser] = useState(user.is_superuser);
  const [permissionMsg, setPermissionMsg] = useState<string>('');
  const [superUserMsg, setSuperUserMsg] = useState<string>('');

  const loggedUser = getItem('email');
  const isloggedUserSuperuser = getItem('isSuperuser');

  useEffect(() => {
    if (loggedUser && loggedUser === user.email) {
      setPermissionMsg('You cannot manage own permissions');
    }
  }, []);

  const handlePermissions = async (permission: PatchData) => {
    if (permissionMsg) return;
    try {
      const { data: patchedUser } = await userService.patchUser(
        user.id,
        permission
      );
      switch (permission.dataType) {
        case 'IsActive':
          setStatusActive(patchedUser.is_active);
          break;
        case 'IsStaff':
          setStatusStaff(patchedUser.is_staff);
          break;
        case 'IsSuperuser':
          setStatusSuperuser(patchedUser.is_superuser);
          break;
      }
    } catch (e) {
      const err = e as AxiosError;
      console.log(err.response?.data);
    }
  };

  const checkIfSuperuserToHandlePermissions = () => {
    if (isloggedUserSuperuser && isloggedUserSuperuser === 'false') {
      setSuperUserMsg('Only superusers allowed to change this field');
      return;
    }
    handlePermissions({
      dataType: 'IsSuperuser',
      is_superuser: !statusSuperuser,
    });
  };

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
        {loggedUser && loggedUser === user.email && (
          <span style={{ color: 'crimson' }}>{permissionMsg}</span>
        )}
        <h4
          className={css.status}
          onClick={() =>
            handlePermissions({
              dataType: 'IsActive',
              is_active: !statusActive,
            })
          }
        >
          Is_active: {statusActive ? 'true' : 'false'}
        </h4>
        <h4
          className={css.status}
          onClick={() =>
            handlePermissions({
              dataType: 'IsStaff',
              is_staff: !statusStaff,
            })
          }
        >
          Is_staff: {statusStaff ? 'true' : 'false'}
        </h4>
        {superUserMsg && (
          <span style={{ color: 'crimson' }}>{superUserMsg}</span>
        )}
        <h4
          className={css.status}
          onClick={checkIfSuperuserToHandlePermissions}
        >
          Is_superuser: {statusSuperuser ? 'true' : 'false'}
        </h4>

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

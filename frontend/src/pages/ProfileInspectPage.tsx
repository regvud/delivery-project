import { useParams } from 'react-router-dom';
import { userService } from '../services/userService';
import { useEffect, useState } from 'react';
import { User } from '../types/userTypes';
import { AxiosError } from 'axios';
import { ProfileInspectCard } from './ProfileInspectCard';
import { deliveryService } from '../services/deliveryService';
import { UserDeliveriesResponse } from '../types/deliveryTypes';

type UserFetchResponse = {
  detail: string;
};

export const ProfileInspectPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>();
  const [deliveries, setDeliveries] = useState<
    UserDeliveriesResponse | undefined
  >();

  const [error, setError] = useState<UserFetchResponse | undefined>();
  const [errorDelivery, setErrorDelivery] = useState<
    UserFetchResponse | undefined
  >();

  if (!id) return <h1>Provide userId in url</h1>;

  const fetchUser = async () => {
    try {
      await userService.byID(+id).then(({ data }) => setUser(data));
    } catch (e) {
      const err = e as AxiosError;
      setError(err.response?.data as UserFetchResponse);
    }
  };

  const fethUserDeliveries = async () => {
    try {
      await deliveryService
        .getUserDeliveries(+id)
        .then(({ data }) => setDeliveries(data));
    } catch (e) {
      const err = e as AxiosError;
      setErrorDelivery(err.response?.data as UserFetchResponse);
    }
  };

  useEffect(() => {
    fetchUser();
    fethUserDeliveries();
  }, [id]);

  if (error) return <h1>{error?.detail}</h1>;
  if (errorDelivery) return <h1>{errorDelivery?.detail}</h1>;

  return (
    <>
      {user && (
        <ProfileInspectCard
          sending={deliveries?.sending}
          receiving={deliveries?.receiving}
          user={user}
          key={user.id}
        />
      )}
    </>
  );
};

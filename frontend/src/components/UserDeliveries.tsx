import { deliveryService } from '../services/deliveryService';
import { useFetch } from '../hooks/useFetch';
import { DeliveryMapComponent } from './DeliveryMapComponent';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserDeliveries = () => {
  const { getItem } = useLocalStorage();
  const userId = getItem('id');

  if (!userId) return <h1>no user id</h1>;

  const {
    data: userDeliveries,
    error,
    isLoading,
  } = useFetch(deliveryService.getUserDeliveries(+userId), ['userDeliveries']);

  if (!userDeliveries) return null;
  if (error) return <h1>{error.message}</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      {userDeliveries?.receiving?.length !== 0 && (
        <DeliveryMapComponent
          array={userDeliveries?.receiving}
          title="receiving"
        />
      )}
      {userDeliveries?.sending.length !== 0 && (
        <DeliveryMapComponent array={userDeliveries?.sending} title="sending" />
      )}
    </>
  );
};

export { UserDeliveries };

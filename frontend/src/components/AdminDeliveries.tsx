import { useFetch } from '../hooks/useFetch';
import { deliveryService } from '../services/deliveryService';
import { AdminDeliveryCard } from './AdminDeliveryCard';

export const AdminDeliveries = () => {
  const {
    data: adminDeliveries,
    isLoading,
    error,
  } = useFetch(deliveryService.getAdminDeliveries(1), ['adminDeliveries']);
  if (isLoading) return <h1>...Loading</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <>
      {adminDeliveries?.results.map((delivery) => (
        <AdminDeliveryCard delivery={delivery} key={delivery.id} />
      ))}
    </>
  );
};

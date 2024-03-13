import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DeliveryCard } from '../components/DeliveryCard';
import { deliveryService } from '../services/deliveryService';
import { Delivery } from '../types/deliveryTypes';
import { useFetch } from '../hooks/useFetch';

const DeliveryDetail = () => {
  const { state: deliveryFromLocation } = useLocation();
  const { deliveryId } = useParams();

  const navigate = useNavigate();

  // using delivery from state
  if (deliveryFromLocation) {
    return (
      <DeliveryCard
        delivery={deliveryFromLocation}
        navigateFunc={() =>
          navigate(`delivery/${deliveryId}`, { state: deliveryFromLocation })
        }
        detailed={true}
      />
    );
  }
  console.log(deliveryId);
  //fetching delivery using params
  if (deliveryId !== undefined) {
    const {
      data: fetchedDelivery,
      isLoading,
      error,
    } = useFetch<Delivery | void>(deliveryService.byID(+deliveryId), [
      'delivery',
    ]);

    if (error) return <h1>No delivery found...</h1>;
    if (isLoading) return <h1>Loading...</h1>;
    return (
      <>
        {fetchedDelivery && (
          <DeliveryCard
            delivery={fetchedDelivery}
            navigateFunc={() => navigate(`delivery/${deliveryId}`)}
            detailed={true}
          />
        )}
      </>
    );
  }

  // If neither location state nor deliveryId is available
  return <h1>No delivery found...</h1>;
};

export { DeliveryDetail };

import { useNavigate } from 'react-router-dom';
import { Delivery } from '../types/deliveryTypes';
import { DeliveryCard } from './DeliveryCard';

interface DeliveryMapComponentProps {
  array: Delivery[] | undefined;
  title?: string;
}

const DeliveryMapComponent = ({ array, title }: DeliveryMapComponentProps) => {
  const navigate = useNavigate();

  return (
    <>
      {title && <h1 style={{ textAlign: 'center' }}>{title.toUpperCase()}</h1>}
      {array?.map((delivery) => (
        <div className="delivery-block" key={delivery.id}>
          <DeliveryCard
            key={delivery.id}
            delivery={delivery}
            navigateFunc={() =>
              navigate(`delivery/${delivery.id}`, { state: delivery })
            }
          />
        </div>
      ))}
    </>
  );
};

export { DeliveryMapComponent };

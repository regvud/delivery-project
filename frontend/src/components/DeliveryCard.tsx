import { Delivery } from '../types/deliveryTypes';
import css from './styles/DeliveryCard.module.css';
import button from '../pages/styles/DeliveryPage.module.css';

interface DeliveryCardProps {
  delivery: Delivery;
  navigateFunc?: () => void;
  detailed?: boolean;
}

const DeliveryCard = ({
  delivery,
  navigateFunc,
  detailed,
}: DeliveryCardProps) => {
  const toDetails = () => {
    navigateFunc && navigateFunc();
  };

  return (
    <>
      {detailed ? (
        <div className={css.deliveryDetailsContainer}>
          <h2>Info</h2>
          <hr />
          <h3>ID: {delivery.id}</h3>
          <h3>Status: {delivery.status}</h3>
          <h3>Receiver: {delivery.receiver}</h3>
          <h3>Sender: {delivery.sender}</h3>
          <h3>Department: {delivery.department}</h3>

          <div>
            <h2>Item</h2>
            <hr />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                className={css.image}
                src={delivery.item.image[0].image}
                alt={delivery.item.label}
              />
            </div>

            <h3>Label: {delivery.item.label}</h3>
            <h3>Price: {delivery.item.price}</h3>
            <h3>Size: {delivery.item.size}</h3>
          </div>
        </div>
      ) : (
        <div className={css.deliveryDetailsContainer}>
          <h2>Info</h2>
          <hr />
          <h3>ID: {delivery.id}</h3>
          <h3>Status: {delivery.status}</h3>

          <div>
            <hr />
            <h2>Item</h2>
            <h3>Label: {delivery.item.label}</h3>
          </div>

          <button className={button.button} onClick={toDetails}>
            Details
          </button>
        </div>
      )}
    </>
  );
};

export { DeliveryCard };

import { AdminDelivery } from '../types/deliveryTypes';

interface AdminDeliveryCardProps {
  delivery: AdminDelivery;
}

export const AdminDeliveryCard = ({ delivery }: AdminDeliveryCardProps) => {
  return (
    <div>
      <div>
        <h3>{delivery.id}</h3>
      </div>
      <div>
        <h3>{delivery.sender.email}</h3>
      </div>
      <div>
        <h3>{delivery.receiver.email}</h3>
      </div>
      <div>
        <h3>{delivery.item.label}</h3>
      </div>
      <div>
        <h3>{delivery.department.general_number}</h3>
      </div>
    </div>
  );
};

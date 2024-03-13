import { useNavigate } from 'react-router-dom';
import { AdminDelivery } from '../types/deliveryTypes';
import css from './styles/AdminDeliveryCard.module.css';

interface AdminDeliveryCardProps {
  delivery: AdminDelivery;
}

export const AdminDeliveryCard = ({ delivery }: AdminDeliveryCardProps) => {
  const navigate = useNavigate();

  function jumpToUserProfile(userId: number) {
    navigate(`/admin/users/${userId}`);
  }

  function jumpToDepartment(departmentId: number) {
    navigate(`/departments/${departmentId}`);
  }

  function jumpToDelivery(deliveryId: number) {
    navigate(`/deliveries/${deliveryId}`);
  }

  return (
    <div className={css.container}>
      <h3
        className={css.numberBlock}
        onClick={() => jumpToDelivery(delivery.id)}
      >
        {delivery.id}
      </h3>
      <div
        className={css.infoBlock}
        onClick={() => jumpToUserProfile(delivery.sender.id)}
      >
        <h3>{delivery.sender.email}</h3>
        <h5>{delivery.sender.phone}</h5>
      </div>

      <div className={css.item} onClick={() => jumpToDelivery(delivery.id)}>
        <span>{'--->'}</span>
        <h3 style={{ overflow: 'hidden' }}>{delivery.item.label}</h3>
        <span>{'--->'}</span>
      </div>

      <div
        className={css.infoBlock}
        onClick={() => jumpToUserProfile(delivery.receiver.id)}
      >
        <h3>{delivery.receiver.email}</h3>
        <h5>{delivery.receiver.phone}</h5>
      </div>
      <div onClick={() => jumpToDepartment(delivery.department.id)}>
        <h3 className={css.numberBlock}>
          {delivery.department.general_number}
        </h3>
      </div>
    </div>
  );
};

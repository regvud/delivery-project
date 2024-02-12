import { Department } from '../types/departmentTypes';
import css from './styles/DeliveryCard.module.css';
import button from '../pages/styles/DeliveryPage.module.css';
interface DepartmentCardProps {
  department: Department;
  navigateFunc?: () => void;
}

const DepartmentCard = ({ department, navigateFunc }: DepartmentCardProps) => {
  const toDepartmentDetails = () => {
    navigateFunc && navigateFunc();
  };

  return (
    <div className={css.deliveryDetailsContainer}>
      <h3>General Number: {department.general_number}</h3>
      <hr />
      <h3>City: {department.city}</h3>
      <h3>Status: {department.status ? 'active' : 'closed'}</h3>
      <button className={button.button} onClick={toDepartmentDetails}>
        Details
      </button>
    </div>
  );
};

export { DepartmentCard };

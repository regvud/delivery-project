import { Department } from '../types/departmentTypes';
import css from './styles/DeliveryCard.module.css';

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
      <h3>Region: {department.region}</h3>
      <button onClick={toDepartmentDetails}>Details</button>
    </div>
  );
};

export { DepartmentCard };

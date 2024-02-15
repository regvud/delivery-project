import { departmentService } from '../services/departmentService';
import { Department } from '../types/departmentTypes';
import css from './styles/DeliveryCard.module.css';
import { useState } from 'react';
import button from '../pages/styles/DeliveryPage.module.css';

export const DepartmentDetails = (props: { department: Department }) => {
  const { id, capacity, city, general_number, region, staff_count, status } =
    props.department;
  const [innerStatus, setInnerStatus] = useState<boolean>(status);
  const [msg, setMsg] = useState('');
  const handleStatusChange = async () => {
    try {
      const department = await departmentService.manipulate(id, {
        status: !innerStatus,
      });
      setInnerStatus(department.status);
    } catch (e) {
      setMsg('Only admins can perform this action.');
    }
  };
  return (
    <div className={css.deliveryDetailsContainer}>
      <h3>ID: {id}</h3>
      <hr />
      <h3>General Number: {general_number}</h3>
      <h3>City: {city}</h3>
      <h3>Region: {region}</h3>
      <h3>Capacity: {capacity}</h3>
      <h3>Staff: {staff_count}</h3>
      <div>
        <h3>Status: {innerStatus ? 'active' : 'closed'}</h3>
        {msg ? (
          <h4 style={{ color: 'red' }}>{msg}</h4>
        ) : (
          <button className={button.button} onClick={handleStatusChange}>
            switch status
          </button>
        )}
      </div>
    </div>
  );
};

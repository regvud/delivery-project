import { SubmitHandler, useForm } from 'react-hook-form';
import { Delivery } from '../types/deliveryTypes';
import { deliveryService } from '../services/deliveryService';
import { useState } from 'react';
import { ResponseError } from '../types/axiosTypes';
import { useNavigate } from 'react-router-dom';
import { urls } from '../constants/urls';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import button from './styles/DeliveryPage.module.css';

const CreateDeliveryPage = () => {
  const navigate = useNavigate();
  const [showSuccessCreation, setShowSuccessCreation] = useState(false);
  const [error, setError] = useState<ResponseError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Delivery>();

  const { data: departments } = useFetch(departmentService.active(), [
    'departmentNumbers',
  ]);

  const saveDelivery: SubmitHandler<Delivery> = async (delivery) => {
    try {
      const { data: createdDelivery, request } = await deliveryService.create(
        delivery
      );

      if (request.status === 201) {
        setShowSuccessCreation(true);
        setTimeout(() => {
          navigate(urls.profile.delivery(createdDelivery.id));
        }, 1000);
      }
      setError(JSON.parse(request.response));
    } catch (e) {
      console.log(`unknow error:   ${e}}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(saveDelivery)}>
        {showSuccessCreation ? (
          <h1>Successfully created!</h1>
        ) : (
          <h1>Create Delivery</h1>
        )}
        {error?.detail?.includes('Department') && (
          <h5 style={{ margin: 0, color: 'red' }}>{error.detail}</h5>
        )}

        <label
          style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}
        >
          Choose department:
          <select
            style={{ paddingLeft: '5px', marginLeft: '20px', width: '200px' }}
            id="department-select"
            placeholder="department"
            {...register('department')}
          >
            {departments?.map((department) => (
              <option
                value={department.general_number}
                key={department.general_number}
              >
                № {department.general_number} - {department.city}
              </option>
            ))}
          </select>
        </label>

        {error?.detail?.includes('phone') && (
          <h5 style={{ margin: 0, color: 'red' }}>{error.detail}</h5>
        )}

        <input
          type="text"
          placeholder="receiver"
          {...register('receiver', { required: true })}
        />

        <input
          type="text"
          placeholder="label"
          {...register('item.label', { required: true })}
        />
        <input
          type="number"
          step=".01"
          placeholder="price"
          {...register('item.price', { required: true, min: 1 })}
        />

        <div>
          <h4>Size:</h4>
          {errors['item'] && (
            <h5 style={{ marginBottom: 15, color: 'red' }}>
              Choose prefered size
            </h5>
          )}
          <label>
            <input
              type="radio"
              value={'small'}
              id="small"
              {...register('item.size', { required: true })}
            />
            small
          </label>
          <label>
            <input
              type="radio"
              value={'medium'}
              id="medium"
              {...register('item.size', { required: true })}
            />
            medium
          </label>
          <label>
            <input
              type="radio"
              value={'large'}
              id="large"
              {...register('item.size', { required: true })}
            />
            large
          </label>
          <label>
            <input
              type="radio"
              value={'giant'}
              id="giant"
              {...register('item.size', { required: true })}
            />
            giant
          </label>
        </div>

        <button className={button.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export { CreateDeliveryPage };

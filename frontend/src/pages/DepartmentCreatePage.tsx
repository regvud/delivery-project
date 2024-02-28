import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { unknown, z } from 'zod';
import { departmentService } from '../services/departmentService';
import { cityService } from '../services/cityService';
import { useLocation, useNavigate } from 'react-router-dom';
import button from './styles/DeliveryPage.module.css';
import css from './styles/CreateDelivery.module.css';
import { useEffect, useState } from 'react';
import { City } from '../types/departmentTypes';
import { AxiosError } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const schema = z.object({
  general_number: z
    .number({ invalid_type_error: 'Enter a number' })
    .min(1, 'Number must be greater than 1'),
  city: z.string(),
  region: z.string(),
  capacity: z
    .number({ invalid_type_error: 'Enter a number' })
    .min(100, 'Number must be between 100 - 10000')
    .max(1000, 'Number must be between 100 - 10000'),
  staff_count: z
    .number({ invalid_type_error: 'Enter a number' })
    .min(5, 'Number must be between 5 - 30')
    .max(30, 'Number must be between 5 - 30'),
  status: z.boolean(),
});

type DepartmentSchema = z.infer<typeof schema>;

const DepartmentCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentSchema>({
    resolver: zodResolver(schema),
  });
  type GenNumError = { general_number: string[] };

  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<void | City[]>([]);
  const [responseError, setResponseError] = useState<GenNumError | unknown>();
  const isStaff = getItem('isStaff');

  useEffect(() => {
    if (isStaff === 'false') {
      navigate('/profile');
    }
    cityService().then((citiesData) => setCities(citiesData));
    departmentService.regions().then((regionsData) => setRegions(regionsData));
  }, []);

  const submit: SubmitHandler<DepartmentSchema> = async (department) => {
    try {
      const { request } = await departmentService.create(department);

      if (request.status == 201) {
        navigate('/departments');
      }
    } catch (e) {
      const err = e as AxiosError;
      setResponseError(err.response?.data);
    }
  };
  return (
    <form className={css.form} onSubmit={handleSubmit(submit)}>
      <h1 className={css.title}>Create Department</h1>

      {errors.city && <span>{errors.city.message}</span>}
      <select
        id="city-select"
        placeholder="city"
        {...register('city', { required: 'Select a valid city' })}
      >
        <option value="">select city</option>
        {cities?.map((city) => (
          <option value={city.name} key={city.objectId}>
            {city.name}
          </option>
        ))}
      </select>

      {errors.region && <span>{errors.region.message}</span>}
      <select
        id="region-select"
        placeholder="region"
        {...register('region', { required: 'Select a valid region' })}
      >
        <option value="">select region</option>
        {regions?.map((region) => (
          <option value={region} key={region}>
            {region}
          </option>
        ))}
      </select>

      {responseError !== unknown && (
        <span>{(responseError as GenNumError)?.general_number[0]}</span>
      )}
      {errors.general_number && <span>{errors.general_number.message}</span>}
      <label>
        General Number:
        <input
          type="number"
          {...register('general_number', {
            required: 'Enter a number',
            valueAsNumber: true,
          })}
        />
      </label>

      {errors.capacity && <span>{errors.capacity.message}</span>}
      <label>
        Capacity:
        <input
          type="number"
          {...register('capacity', {
            required: 'Enter a number',
            valueAsNumber: true,
          })}
        />
      </label>
      {errors.staff_count && <span>{errors.staff_count.message}</span>}
      <label>
        Staff count:
        <input
          type="number"
          {...register('staff_count', {
            required: 'Enter a number',
            valueAsNumber: true,
            validate: {
              isNumber: (value) => {
                if (!value) {
                  return 'Enter a number';
                }
              },
            },
          })}
        />
      </label>
      {errors.status && <span>{errors.status.message}</span>}
      <label style={{ display: 'flex', justifyContent: 'center' }}>
        Active:
        <input type="checkbox" {...register('status')} />
      </label>

      <button className={button.button}>Create</button>
    </form>
  );
};

export { DepartmentCreatePage };

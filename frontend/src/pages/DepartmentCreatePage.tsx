import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { departmentService } from '../services/departmentService';
import { useFetch } from '../hooks/useFetch';
import { cityService } from '../services/cityService';
import { useNavigate } from 'react-router-dom';
import button from './styles/DeliveryPage.module.css';
import css from './styles/CreateDelivery.module.css';
import { authService } from '../services/authService';
import { useEffect, useState } from 'react';
import { City } from '../types/departmentTypes';
import { isDoStatement } from 'typescript';

const schema = z.object({
  general_number: z.number().min(1, 'Number must be greater than 1'),
  city: z.string(),
  region: z.string(),
  capacity: z
    .number()
    .min(100, 'Number must be between 100 - 10000')
    .max(1000, 'Number must be between 100 - 10000'),
  staff_count: z
    .number()
    .min(5, 'Number must be between 5 - 30')
    .max(30, 'Number must be between 5 - 30'),
  status: z.boolean(),
});

type DepartmentSchema = z.infer<typeof schema>;

const DepartmentCreatePage = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<DepartmentSchema>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<void | City[]>([]);
  const [isStaff, setIsStaff] = useState<boolean>();

  useEffect(() => {
    authService.me().then((user) => setIsStaff(user.is_staff));
    cityService().then((citiesData) => setCities(citiesData));
    departmentService.regions().then((regionsData) => setRegions(regionsData));
  }, []);

  if (!isStaff)
    return (
      <h1 style={{ textAlign: 'center' }}>
        Only admins can create departments.
      </h1>
    );

  const submit: SubmitHandler<DepartmentSchema> = async (department) => {
    try {
      const { request } = await departmentService.create(department);

      if (request.status == 201) {
        reset();
        navigate('/departments');
      }
    } catch (e: any) {
      setError('root', { message: e });
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(submit)}>
      <h1>Create Department</h1>

      {errors.city && <h4>{errors.city.message}</h4>}
      <label
        style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}
      >
        Choose city:
        <select
          style={{ paddingLeft: '5px', marginLeft: '20px', width: '200px' }}
          id="city-select"
          placeholder="city"
          {...register('city')}
        >
          {cities?.map((city) => (
            <option value={city.name} key={city.objectId}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

      {errors.region && <h4>{errors.region.message}</h4>}
      <label
        style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}
      >
        Choose region:
        <select
          style={{ paddingLeft: '5px', marginLeft: '20px', width: '200px' }}
          id="region-select"
          placeholder="region"
          {...register('region')}
        >
          {regions?.map((region) => (
            <option value={region} key={region}>
              {region}
            </option>
          ))}
        </select>
      </label>

      {errors.general_number && <h4>{errors.general_number.message}</h4>}
      <input
        type="number"
        placeholder="general_number"
        {...register('general_number', { valueAsNumber: true })}
      />

      {errors.capacity && <h4>{errors.capacity.message}</h4>}
      <input
        type="number"
        placeholder="capacity"
        {...register('capacity', { valueAsNumber: true })}
      />
      {errors.staff_count && <h4>{errors.staff_count.message}</h4>}
      <input
        type="number"
        placeholder="staff count"
        {...register('staff_count', { valueAsNumber: true })}
      />
      {errors.status && <h4>{errors.status.message}</h4>}
      <label>
        Active:
        <input type="checkbox" {...register('status')} />
      </label>

      {errors.root && <h2>{errors.root.message}</h2>}
      <button className={button.button}>Create</button>
    </form>
  );
};

export { DepartmentCreatePage };

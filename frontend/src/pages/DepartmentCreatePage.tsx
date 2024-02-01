import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { departmentService } from '../services/departmentService';

const schema = z.object({
  id: z.number(),
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
    formState: { errors },
  } = useForm<DepartmentSchema>({
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<DepartmentSchema> = async (department) => {
    await departmentService.create(department);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>Department Create Page</h1>

      {errors.general_number && <h3>{errors.general_number.message}</h3>}
      <input
        type="number"
        placeholder="general_number"
        {...register('general_number')}
      />

      {errors.city && <h3>{errors.city.message}</h3>}
      <input type="text" placeholder="city" {...register('city')} />

      {errors.region && <h3>{errors.region.message}</h3>}
      <input type="text" placeholder="region" {...register('region')} />

      {errors.capacity && <h3>{errors.capacity.message}</h3>}
      <input type="number" placeholder="capacity" {...register('capacity')} />

      {errors.staff_count && <h3>{errors.staff_count.message}</h3>}
      <input
        type="number"
        placeholder="staff count"
        {...register('staff_count')}
      />

      {errors.status && <h3>{errors.status.message}</h3>}
      <label>
        Status:
        <input type="checkbox" value={'true'} {...register('status')} />
      </label>

      <button>Create</button>
    </form>
  );
};

export { DepartmentCreatePage };

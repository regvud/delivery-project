import { useLocation, useParams } from 'react-router-dom';
import { Department } from '../types/departmentTypes';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';

const DepartmentDetails = (props: { department: Department }) => {
  const { capacity, city, general_number, region, staff_count, status } =
    props.department;

  return (
    <div>
      <h3>General Number: {general_number}</h3>
      <h3>City: {city}</h3>
      <h3>Region: {region}</h3>
      <h3>Capacity: {capacity}</h3>
      <h3>Staff: {staff_count}</h3>
      <h3>Status: {status}</h3>
    </div>
  );
};

export const DepartmentDetailPage = () => {
  const { state: department } = useLocation();
  const { id } = useParams();

  if (id !== undefined && !department) {
    const {
      data: fetchedDepartment,
      isLoading,
      error,
    } = useFetch<Department | void>(departmentService.byID(+id), ['delivery']);

    if (error) return <h1>No department found...</h1>;
    if (isLoading) return <h1>Loading...</h1>;

    return (
      <>
        {fetchedDepartment && (
          <DepartmentDetails
            department={fetchedDepartment}
            key={fetchedDepartment.id}
          />
        )}
      </>
    );
  }

  return <DepartmentDetails department={department} key={department.id} />;
};

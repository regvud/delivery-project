import { useLocation, useParams } from 'react-router-dom';
import { Department } from '../types/departmentTypes';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import { DepartmentDetails } from '../components/DepartmentDetails';

export const DepartmentDetailPage = () => {
  const { state: department } = useLocation();
  const { id } = useParams();

  if (id !== undefined) {
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

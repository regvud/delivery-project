import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { PleaseLogin } from '../components/PleaseLogin';
import { PagePagination } from '../components/PagePagination';
import { DepartmentCard } from '../components/DepartmentCard';

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { getItem } = useLocalStorage();
  const token = getItem('access');

  const currentPage = params.get('page') ?? '1';
  const {
    data: departments,
    isLoading,
    error,
    refetch,
  } = useFetch(departmentService.getAll(+currentPage), ['departments']);

  const total_pages = departments?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (!token) return <PleaseLogin />;

  if (+currentPage > total_pages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: 'center' }}>{error.message}</h1>;

  if (!departments?.results[0])
    return (
      <h1 style={{ textAlign: 'center' }}>
        Department list is currently empty
      </h1>
    );

  return (
    <>
      <PagePagination
        currentPage={+currentPage}
        totalPages={total_pages}
        setURLSearchParams={setParams}
      />
      <div>
        {departments?.results?.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            navigateFunc={() =>
              navigate(`${department.id}`, { state: department })
            }
          />
        ))}
      </div>
    </>
  );
};

export { DepartmentsPage };

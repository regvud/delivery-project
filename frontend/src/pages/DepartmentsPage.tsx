import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { departmentService } from '../services/departmentService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { PleaseLogin } from '../components/PleaseLogin';
import { TestPagination } from '../components/PagePagination';
import { DepartmentCard } from '../components/DepartmentCard';
import css from './styles/DeliveryPage.module.css';

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { getItem } = useLocalStorage();
  const token = getItem('access');
  const currentPage = params.get('page') ?? '1';
  const userIsStaff = getItem('isStaff');

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

  const handleClick = () => navigate('create');

  if (!token) return <PleaseLogin />;

  if (+currentPage > total_pages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: 'center' }}>{error.message}</h1>;

  if (!departments?.results[0])
    return (
      <div className={css.container}>
        <h1>
          Department list is currently empty, only admins able to create
          departments.
        </h1>
        <button className={css.button} onClick={handleClick}>
          Create Department
        </button>
      </div>
    );
  return (
    <>
      <TestPagination currentPage={+currentPage} totalPages={total_pages} />
      <div className={css.container}>
        {userIsStaff == 'true' && (
          <button className={css.button} onClick={handleClick}>
            Create Department
          </button>
        )}
        <div className={css.grid}>
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
      </div>
    </>
  );
};

export { DepartmentsPage };

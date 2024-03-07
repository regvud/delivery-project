import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';
import { useSearchParams } from 'react-router-dom';
import { PagePagination } from './PagePagination';

export const UserComponent = () => {
  const [params, setParams] = useSearchParams();
  const currentPage = params.get('page') ?? '1';

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useFetch(userService.getAll(+currentPage), ['getAllUserList']);

  const total_pages = users?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (+currentPage > total_pages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1>...Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <PagePagination
        currentPage={+currentPage}
        totalPages={total_pages}
        setURLSearchParams={setParams}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h3 style={{ paddingLeft: 10 }}>ID</h3>
        <h3>EMAIL</h3>
        <h3 style={{ paddingRight: 10 }}>STATUS</h3>
        <h3>ACTION</h3>
      </div>
      {users?.results?.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </>
  );
};

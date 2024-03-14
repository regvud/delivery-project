import { useLocation, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { deliveryService } from '../services/deliveryService';
import { AdminDeliveryCard } from './AdminDeliveryCard';
import { TestPagination } from './PagePagination';
import { useEffect } from 'react';
import { FilterSelectComponent } from './FilterSelectComponent';

export const AdminDeliveries = () => {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const searchArr = search.split('&');

  const currentPage = params.get('page') ?? '1';

  const {
    data: adminDeliveries,
    isLoading,
    error,
    refetch,
  } = useFetch(deliveryService.getAdminDeliveries(+currentPage, search), [
    'adminDeliveries',
  ]);

  useEffect(() => {
    setParams((searchParams) => {
      if (!('page' in searchParams.keys())) {
        searchParams.set('page', currentPage);
      }
      return searchParams;
    });

    refetch();
  }, [currentPage, refetch, search]);

  const totalPages = adminDeliveries?.total_pages ?? 1;

  if (+currentPage > totalPages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: 'center' }}>{error.message}</h1>;
  return (
    <>
      <TestPagination currentPage={+currentPage} totalPages={totalPages} />
      <FilterSelectComponent searchArr={searchArr} />

      {!adminDeliveries?.results[0] ? (
        <span>No results for query</span>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0px 100px',
            }}
          >
            <h2>Delivery ID</h2>
            <h2>Sender</h2>
            <h2>Item</h2>
            <h2>Receiver</h2>
            <h2>Department</h2>
          </div>
          {adminDeliveries.results.map((delivery) => (
            <AdminDeliveryCard delivery={delivery} key={delivery.id} />
          ))}
        </>
      )}
    </>
  );
};

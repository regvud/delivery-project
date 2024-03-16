import { useLocation, useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { deliveryService } from '../services/deliveryService';
import { AdminDeliveryCard } from './AdminDeliveryCard';
import { TestPagination } from './PagePagination';
import { useEffect, useState } from 'react';
import { FilterSelectComponent } from './FilterSelectComponent';

export const AdminDeliveries = () => {
  const [params] = useSearchParams();
  const { search } = useLocation();
  const currentPage = params.get('page') ?? '1';
  const [error, setError] = useState<string>('');

  const searchStr = search
    .replace('?', '')
    .split('&')
    .filter((value) => !value.startsWith('page'))
    .join('&');

  const {
    data: adminDeliveries,
    isLoading,
    refetch,
  } = useFetch(
    deliveryService.getAdminDeliveries(+currentPage, searchStr).catch(() => {
      setError(`Invalid Page..`);
    }),
    ['adminDeliveries']
  );

  useEffect(() => {
    refetch();
  }, [search]);

  const totalPages = adminDeliveries?.data.total_pages ?? 1;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: 'center' }}>{error}</h1>;

  return (
    <>
      <TestPagination currentPage={+currentPage} totalPages={totalPages} />
      <FilterSelectComponent />

      {!adminDeliveries?.data?.results[0] ? (
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
          {adminDeliveries.data.results.map((delivery) => (
            <AdminDeliveryCard delivery={delivery} key={delivery.id} />
          ))}
        </>
      )}
    </>
  );
};

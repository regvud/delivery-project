import { useLocation, useSearchParams } from 'react-router-dom';
import { useFetchTest } from '../hooks/useFetch';
import { AdminDeliveryCard } from './AdminDeliveryCard';
import { TestPagination } from './PagePagination';
import { useEffect, useState } from 'react';
import { FilterSelectComponent } from './FilterSelectComponent';
import { AxiosError } from 'axios';
import { ErrorDetail } from './UsersComponent';
import { deliveryService } from '../services/deliveryService';

export const AdminDeliveries = () => {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const [urlPage, setUrlPage] = useState(params.get('page') ?? '1');
  const [, setError] = useState<ErrorDetail | undefined>();

  const searchStr = search
    .replace('?', '')
    .split('&')
    .filter((value) => !value.startsWith('page'))
    .join('&');

  const {
    data: adminDeliveries,
    isLoading,
    refetch,
  } = useFetchTest(fetchAdminDeliveries, ['adminDeliveries']);

  const totalPages = adminDeliveries?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [search, refetch, urlPage]);

  async function fetchAdminDeliveries() {
    try {
      const users = await deliveryService
        .getAdminDeliveries(+urlPage, searchStr)
        .then(({ data }) => data);
      setError(undefined);
      return users;
    } catch (e) {
      const err = e as AxiosError;
      setError(err?.response?.data as ErrorDetail);

      if (urlPage !== '1') {
        handleParams();
      }

      return;
    }
  }

  function handleParams() {
    setUrlPage('1');
    setParams((params) => {
      params.set('page', '1');
      return params;
    });
  }

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  return (
    <>
      <TestPagination
        setPage={setUrlPage}
        currentPage={+urlPage}
        totalPages={totalPages}
      />
      <FilterSelectComponent />
      {!adminDeliveries?.results[0] ? (
        <h1>No results for query</h1>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0px 100px',
              fontFamily: 'Jetbrains Mono',
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

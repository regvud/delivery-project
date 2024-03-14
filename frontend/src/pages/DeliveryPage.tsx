import { deliveryService } from '../services/deliveryService';
import { DeliveryCard } from '../components/DeliveryCard';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TestPagination } from '../components/PagePagination';
import { useEffect } from 'react';
import css from './styles/DeliveryPage.module.css';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const currentPage = params.get('page') ?? '1';

  const {
    data: deliveries,
    isLoading,
    error,
    refetch,
  } = useFetch(deliveryService.getAll(+currentPage), ['deliveries']);

  const totalPages = deliveries?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (+currentPage > totalPages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;

  if (error) return <h1 style={{ textAlign: 'center' }}>{error.message}</h1>;

  if (!deliveries?.results[0])
    return (
      <div className={css.container}>
        <h1>Delivery list is currently empty</h1>
      </div>
    );

  return (
    <>
      <TestPagination currentPage={+currentPage} totalPages={totalPages} />
      <div className={css.grid}>
        {deliveries?.results?.map((delivery) => (
          <DeliveryCard
            key={delivery.id}
            delivery={delivery}
            navigateFunc={() => navigate(`${delivery.id}`, { state: delivery })}
          />
        ))}
      </div>
    </>
  );
};

export { DeliveryPage };

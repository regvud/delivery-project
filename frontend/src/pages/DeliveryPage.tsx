import { deliveryService } from '../services/deliveryService';
import { DeliveryCard } from '../components/DeliveryCard';
import { useFetch } from '../hooks/useFetch';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PleaseLogin } from '../components/PleaseLogin';
import { PagePagination } from '../components/PagePagination';
import { useEffect } from 'react';
import css from './styles/DeliveryPage.module.css';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const token = localStorage.getItem('access');

  const currentPage = params.get('page') ?? '1';
  const { data, isLoading, error, refetch } = useFetch(
    deliveryService.getAll(+currentPage),
    ['deliveries']
  );

  const total_pages = data?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (!token) return <PleaseLogin />;

  if (+currentPage > total_pages) return <h1>Invalid page..</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <PagePagination
        currentPage={+currentPage}
        totalPages={total_pages}
        setURLSearchParams={setParams}
      />
      <div className={css.grid}>
        {data?.results?.map((delivery) => (
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

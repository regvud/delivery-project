import Pagination from '@mui/material/Pagination';
import { SetURLSearchParams } from 'react-router-dom';

type PagePaginationProps = {
  totalPages: number;
  currentPage: number;
  setURLSearchParams: SetURLSearchParams;
};

export function PagePagination({
  currentPage,
  totalPages,
  setURLSearchParams,
}: PagePaginationProps) {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) =>
    setURLSearchParams({ page: page.toString() });

  return (
    <Pagination count={totalPages} onChange={handleChange} page={currentPage} />
  );
}

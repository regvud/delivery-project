import Pagination from '@mui/material/Pagination';
import {
  SetURLSearchParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

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

type TestPaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage?: React.Dispatch<React.SetStateAction<string>>;
};

export function TestPagination({
  currentPage,
  totalPages,
  setPage,
}: TestPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const urlKeyValuesArr = [];

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (setPage) {
      setPage(page.toString());
    }

    setSearchParams((setParams) => {
      setParams.set('page', page.toString());
      return setParams;
    });
  };

  let filters = '';

  if (searchParams.size > 1) {
    for (const [k, v] of searchParams.entries()) {
      if (k !== 'page') urlKeyValuesArr.push(`${k}=${v}`);
    }

    filters = urlKeyValuesArr.join('&');
  }

  new URLSearchParams(`${search}&${filters}`);

  return (
    <Pagination count={totalPages} onChange={handleChange} page={currentPage} />
  );
}

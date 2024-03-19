import { useEffect, useRef, useState } from 'react';
import { useFetchTest } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TestPagination } from './PagePagination';
import { AxiosError } from 'axios';
import button from '../pages/styles/DeliveryPage.module.css';
import css from '../pages/styles/LoginPage.module.css';

export interface ErrorDetail {
  detail: string;
}

export const UserComponent = () => {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();

  //states
  const [, setSearchValue] = useState('');
  const [, setError] = useState<ErrorDetail | undefined>();

  //refsa
  const searchInputRef = useRef('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchStr = search
    .replace('?', '')
    .split('&')
    .filter((value) => !value.startsWith('page'))
    .join('&');

  const [urlPage, setUrlPage] = useState(params.get('page') ?? '1');

  const {
    data: users,
    isLoading,
    refetch,
  } = useFetchTest(fetchUsers, ['getAllUserList']);

  const totalPages = users?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [search, refetch, urlPage]);

  //fetch
  async function fetchUsers() {
    try {
      const users = await userService
        .getAll(+urlPage, searchStr)
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

  //functions
  function handleParams() {
    setUrlPage('1');
    setParams((params) => {
      params.set('page', '1');
      return params;
    });
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchInputRef.current = e.target.value;
    if (searchInputRef.current === '') handleDropFilters();
  }

  function handleButtonClick() {
    const input = searchInputRef.current;
    if (!input) {
      return;
    }

    setSearchValue(input);

    const email_key = 'email__icontains';
    setParams((searchParams) => {
      if (input !== '') {
        searchParams.set(email_key, input);
      }

      return searchParams;
    });
  }

  function handleDropFilters() {
    setParams({});
    setSearchValue('');
  }

  if (+urlPage > totalPages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>...Loading</h1>;

  return (
    <>
      <TestPagination
        setPage={setUrlPage}
        currentPage={+urlPage}
        totalPages={totalPages}
      />
      <div
        style={{
          width: '30%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <input
            className={css.inputStyles}
            style={{ margin: '0 5px' }}
            type="text"
            placeholder="enter user email"
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <button
            className={button.button}
            style={{ height: 35 }}
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            search
          </button>
        </div>
        {searchStr.length > 1 && (
          <span
            style={{ cursor: 'pointer', color: 'magenta', marginRight: 30 }}
            onClick={handleDropFilters}
          >
            drop filters
          </span>
        )}
      </div>
      {!users?.results[0] ? (
        <h1>No matching results</h1>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid grey',
              fontFamily: 'Jetbrains Mono',
            }}
          >
            <h3 style={{ paddingLeft: 10 }}>ID</h3>
            <h3>EMAIL</h3>
            <h3 style={{ paddingRight: 10 }}>STATUS</h3>
            <h3>ACTION</h3>
          </div>
          {users.results.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      )}
    </>
  );
};

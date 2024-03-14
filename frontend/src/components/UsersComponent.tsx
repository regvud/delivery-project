import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TestPagination } from './PagePagination';

export const UserComponent = () => {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const currentPage = params.get('page') ?? '1';

  //states
  const [, setSearchValue] = useState('');

  //refs
  const searchInputRef = useRef('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const searchArr = search
    .replace('?', '')
    .split('&')
    .filter((value) => !value.startsWith('page'))
    .join('&');

  //fetch
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch(userService.getAll(+currentPage, searchArr), ['getAllUserList']);

  const totalPages = users?.total_pages ?? 1;

  useEffect(() => {
    refetch();
  }, [search]);

  //functions
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click();
      setSearchValue(searchInputRef.current);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchInputRef.current = e.target.value;
    if (searchInputRef.current === '') handleDropFilters();
  }

  function handleButtonClick() {
    if (!searchInputRef.current) {
      return;
    }

    const email_key = 'email__icontains';
    setParams((searchParams) => {
      if (searchInputRef.current !== '') {
        searchParams.set(email_key, searchInputRef.current);
      }

      return searchParams;
    });
  }

  function handleDropFilters() {
    setParams({});
    setSearchValue('');
  }

  if (+currentPage > totalPages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1 style={{ textAlign: 'center' }}>...Loading</h1>;
  if (isError) return <h1 style={{ textAlign: 'center' }}>{error?.message}</h1>;

  return (
    <>
      <TestPagination currentPage={+currentPage} totalPages={totalPages} />
      <div>
        <input
          type="text"
          placeholder="enter user email"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />

        <button ref={buttonRef} onClick={handleButtonClick}>
          search
        </button>
        {searchArr.length > 1 && (
          <button onClick={handleDropFilters}>drop filters</button>
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

import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PagePagination } from './PagePagination';

export const UserComponent = () => {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const currentPage = params.get('page') ?? '1';
  const searchArr = search.split('&');

  //states
  const [stringParams, setStringParams] = useState<string>();
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  //refs
  const searchInputRef = useRef('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  //fetch
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useFetch(userService.getAll(+currentPage, search || stringParams), [
    'getAllUserList',
  ]);

  const totalPages = users?.total_pages ?? 1;

  useEffect(() => {
    const email = 'email__icontains';
    setParams((searchParams) => {
      if (!(email in searchParams.keys())) {
        searchParams.set('page', currentPage);
      }
      handleStringParams();
      return searchParams;
    });
    refetch();
  }, [params]);

  useEffect(() => {
    if (!searchInputRef.current) {
      handleDropFilters();
    }
  }, [searchInputRef.current]);

  //functions

  function handleStringParams() {
    const excludedArray: string[] = [];
    params.forEach((v, k) => {
      if (k !== 'page') {
        excludedArray.push(`${k}=${v}`);
      }
    });
    const newParams = excludedArray.join().replace(',', '&');
    setStringParams(newParams);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && buttonRef.current) {
      buttonRef.current.click();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchInputRef.current = e.target.value;
    setIsActiveSearch(!!searchInputRef.current);
  };

  function handleButtonClick() {
    const email_key = 'email__icontains';
    setParams((searchParams) => {
      if (searchInputRef.current !== '') {
        searchParams.set(email_key, searchInputRef.current);
      } else {
        searchParams.delete(email_key);
      }

      return searchParams;
    });
  }

  function handleDropFilters() {
    setParams({});
  }

  if (+currentPage > totalPages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1>...Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <PagePagination
        currentPage={+currentPage}
        totalPages={totalPages}
        setURLSearchParams={setParams}
      />
      <div>
        <input
          type="text"
          placeholder="enter user email"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <button
          disabled={!isActiveSearch}
          ref={buttonRef}
          onClick={handleButtonClick}
        >
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

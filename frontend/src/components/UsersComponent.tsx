import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { UserCard } from './UserCard';
import { useSearchParams } from 'react-router-dom';
import { PagePagination } from './PagePagination';

export const UserComponent = () => {
  const [params, setParams] = useSearchParams();
  const [stringParams, setStringParams] = useState<string>('');
  const currentPage = params.get('page') ?? '1';

  //refs
  const searchInputRef = useRef('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState<string | null>(null);

  //fetch
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useFetch(
    userService.getAll(+currentPage, inputValue ? inputValue : stringParams),
    ['getAllUserList']
  );

  const total_pages = users?.total_pages ?? 1;

  useEffect(() => {
    setParams((searchParams) => {
      searchParams.delete('email__icontains');
      searchParams.set('page', currentPage);
      return searchParams;
    });
  }, []);

  useEffect(() => {
    handleStringParams();
    refetch();
  }, [currentPage, refetch, users, inputValue]);

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchInputRef.current = e.target.value;
  }

  function handleButtonClick() {
    const key = 'email__icontains';
    setInputValue(`${key}=${searchInputRef.current}`);
    setParams((searchParams) => {
      searchParams.delete('page');
      searchParams.set(key, searchInputRef.current);
      return searchParams;
    });
  }

  if (+currentPage > total_pages)
    return <h1 style={{ textAlign: 'center' }}>Invalid page..</h1>;

  if (isLoading) return <h1>...Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <PagePagination
        currentPage={+currentPage}
        totalPages={total_pages}
        setURLSearchParams={setParams}
      />
      <div>
        <input
          type="text"
          placeholder="enter user email"
          onChange={handleInputChange}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <button ref={buttonRef} onClick={handleButtonClick}>
          search
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h3 style={{ paddingLeft: 10 }}>ID</h3>
        <h3>EMAIL</h3>
        <h3 style={{ paddingRight: 10 }}>STATUS</h3>
        <h3>ACTION</h3>
      </div>
      {users?.results?.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </>
  );
};

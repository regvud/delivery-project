import { useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Filter } from './Filter';

export const FilterSelectComponent = () => {
  const [, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const searchArr = search.split('&').filter((v) => !v.startsWith('?page'));

  const valueKeys = {
    delivery: 'id',
    department: 'department__general_number',
    receiverEmail: 'receiver__email__icontains',
    receiverPhone: 'receiver__phone__icontains',
    senderEmail: 'sender__email__icontains',
    senderPhone: 'sender__phone__icontains',
  };

  // states
  const [toggleInput, setToggleInput] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('');

  //refs
  const inputRef = useRef<HTMLInputElement>(null);
  const urlKeyValue = useRef<string>('');

  function handleFilter(key: string | undefined) {
    if (key) {
      handleInputPlaceholder(key);
      setToggleInput(true);
      urlKeyValue.current = key;
    }
  }

  function submitFilter() {
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      setToggleInput(false);

      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams);
        updatedParams.set(urlKeyValue.current, inputValue);
        return updatedParams;
      });
    }
  }

  function handleInputPlaceholder(key: string) {
    let placeholder = '';
    let id = '';

    Object.entries(valueKeys).forEach((v) => {
      if (v[1] === key) {
        let matcher = v[0];
        matcher = matcher.replace(/([A-Z])/g, ' $1').trim();
        if (matcher === 'delivery' || matcher === 'department') {
          id = 'id';
        }

        placeholder = `enter ${matcher.toLowerCase()} ${id}`;
      }
    });

    setInputPlaceholder(placeholder);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      submitFilter();
    }
  }

  function dropFilters() {
    setSearchParams({});
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <select id="filter-selector">
          Add filter
          <option selected disabled hidden>
            Filter
          </option>
          <optgroup label="ID">
            <option
              value={valueKeys.delivery}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Delivery
            </option>
            <option
              value={valueKeys.department}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Department
            </option>
          </optgroup>
          <optgroup label="Email">
            <option
              value={valueKeys.senderEmail}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Sender email
            </option>
            <option
              value={valueKeys.receiverEmail}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Receiver email
            </option>
          </optgroup>
          <optgroup label="Phone">
            <option
              value={valueKeys.senderPhone}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Sender Phone
            </option>
            <option
              value={valueKeys.receiverPhone}
              onClick={(e) => handleFilter(e.currentTarget.value)}
            >
              Receiver Phone
            </option>
          </optgroup>
        </select>
        {toggleInput && (
          <div>
            <input
              type="text"
              ref={inputRef}
              placeholder={inputPlaceholder}
              onKeyDown={handleKeyPress}
            />
            <button onClick={submitFilter}>add filter</button>
          </div>
        )}
        {searchArr.length >= 1 && searchArr[0] !== '' && (
          <span
            style={{
              cursor: 'pointer',
              color: 'violet',
              textAlign: 'center',
            }}
            onClick={dropFilters}
          >
            drop filters
          </span>
        )}
      </div>
      <div style={{ display: 'flex' }}>
        {searchArr.length >= 1 &&
          searchArr[0] !== '' &&
          searchArr.map((filter) => (
            <Filter filter={filter} key={filter} valueKeys={valueKeys} />
          ))}
      </div>
    </div>
  );
};

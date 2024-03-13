import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterSelectComponentProps {
  searchArr: string[];
}

export const FilterSelectComponent = ({
  searchArr,
}: FilterSelectComponentProps) => {
  const [, setSearchParams] = useSearchParams();

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
  //   const [inputPlaceholder, setinputPlaceholder] = useState('test');

  //refs
  const inputRef = useRef<HTMLInputElement>(null);
  const inputPlaceholder = useRef('');
  const urlKeyValue = useRef<string>('');

  function handleFilter(key: string | undefined) {
    if (key) {
      setToggleInput(true);
      urlKeyValue.current = key;
    }
  }

  function submitFilter(inputValue: string) {
    setToggleInput(false);

    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.set(urlKeyValue.current, inputValue);
      return updatedParams;
    });
  }
  function executeSubmitFilter() {
    const inputValue = inputRef.current?.value;

    // switch (inputValue) {
    //   case inputValue === valueKeys.delivery:
    // }
    if (inputValue) {
      submitFilter(inputValue);
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      executeSubmitFilter();
    }
  }

  function dropFilters() {
    setSearchParams({});
  }

  return (
    <div style={{ display: 'flex' }}>
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
            placeholder={inputPlaceholder.current}
            onKeyDown={handleKeyPress}
          />
          <button onClick={executeSubmitFilter}>add filter</button>
        </div>
      )}
      {searchArr.length > 1 && (
        <span
          style={{ cursor: 'pointer', color: 'violet' }}
          onClick={dropFilters}
        >
          drop filters
        </span>
      )}
    </div>
  );
};

import { useSearchParams } from 'react-router-dom';
import garbage from '../assets/garbage.png';
import { useInsertionEffect } from 'react';

interface FilterProps {
  filter: string;
  valueKeys: {
    delivery: string;
    department: string;
    receiverEmail: string;
    receiverPhone: string;
    senderEmail: string;
    senderPhone: string;
  };
}

export const Filter = ({ filter, valueKeys }: FilterProps) => {
  const [, setSearchParams] = useSearchParams();
  let innerFilter = filter;

  if (innerFilter.startsWith('?')) {
    innerFilter = innerFilter.substring(1);
  }

  const splitted = innerFilter.split('=');
  const compareValue = splitted[0];
  const filterValue = splitted[1];

  let properKey = '';
  let removeAttrKey = '';

  Object.entries(valueKeys).forEach((value) => {
    if (value[1] === compareValue) {
      removeAttrKey = value[1];
      properKey = value[0];
    }
  });

  properKey = properKey.replace(/([A-Z])/g, ' $1').trim();
  properKey = properKey.charAt(0).toUpperCase() + properKey.slice(1);

  function removeFilterAttr() {
    setSearchParams((params) => {
      params.delete(removeAttrKey);
      return params;
    });
  }

  return (
    <div
      style={{
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid grey',
        borderRadius: '5px',
        padding: 5,
        margin: 5,
        fontFamily: 'Jetbrains Mono',
      }}
    >
      <span>
        {properKey}: {filterValue}
      </span>
      <img
        onClick={removeFilterAttr}
        style={{ width: 20, height: 20, cursor: 'pointer' }}
        src={garbage}
        alt="d-f"
      />
    </div>
  );
};

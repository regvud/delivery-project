import { useState } from 'react';

const useLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  const remove = localStorage.removeItem(key);
  const [trigger, setTrigger] = useState(null);

  return { trigger, setTrigger, item, remove };
};

export { useLocalStorage };

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);

  const setItem = (key: string, value: string) =>
    localStorage.setItem(key, value);

  const removeItem = (key: string) => localStorage.removeItem(key);

  return { getItem, removeItem, setItem };
};

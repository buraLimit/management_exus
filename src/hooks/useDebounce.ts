import { Pagination } from 'pages/tables/constants';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';

export default function useDebounce(value: string, delay: number, setPagination: Dispatch<SetStateAction<Pagination>>): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setPagination]);
  return debouncedValue;
}

import { useQuery } from '@tanstack/react-query';

export const useFetch = <T>(
  queryFn: Promise<T>,
  queryKey: string[],
  enabled?: boolean
) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () => queryFn,
    queryKey: queryKey,
    enabled: enabled,
  });

  return { data, error, isLoading, refetch };
};
export const useFetchTest = <T>(
  queryFn: () => Promise<T>,
  queryKey: string[],
  enabled?: boolean
) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: queryFn, // Pass the function reference here
    queryKey: queryKey,
    enabled: enabled,
  });

  return { data, error, isLoading, refetch };
};

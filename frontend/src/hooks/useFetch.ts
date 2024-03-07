import { useQuery } from '@tanstack/react-query';

export const useFetch = <T>(
  queryFn: Promise<T>,
  queryKey: string[],
  enabled?: boolean
) => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryFn: () => queryFn,
    queryKey: queryKey,
    enabled: enabled,
  });

  return { data, error, isLoading, isError, refetch };
};

import useFetch from '../../../shared/hooks/useFetch';

interface UseSearchValueProps {
  limit: number;
  page: number;
  query?: string;
}

export function useSearchValue(params: UseSearchValueProps) {
  return useFetch('https://api.poiskkino.dev/v1.4/movie/search', params);
}

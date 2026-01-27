import useFetch from '../../../shared/hooks/useFetch';
import type { MovieResponse } from '../types';

interface Pesponse {
  data: MovieResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function getMovieInfo(id?: number): Pesponse {
  return useFetch(`https://api.poiskkino.dev/v1.4/movie/${id}`, {
    id,
  });
}

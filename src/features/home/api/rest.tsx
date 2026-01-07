import useFetch from '../../../shared/hooks/useFetch';

interface Pesponse {
  data: any;
  isLoading: boolean;
  error: string | null;
}

interface getGanreRowProps {
  type: string;
  limit: number;
  page: number;
  ratingImdb: string;
  ganre: string;
  votesImdb: string;
  sort: string;
}

export function getBannerInfo(): Pesponse {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    'rating.kp': '7.8-9',
    type: 'movie',
    limit: 4,
    page: 1,
    'votes.kp': '800000-999999',
  });
}

export function getGanreRow({
  type,
  limit,
  page,
  ratingImdb,
  ganre,
  votesImdb,
  sort,
}: getGanreRowProps): Pesponse {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    type,
    limit,
    sort,
    page,
    'rating.imdb': ratingImdb,
    'genres.name': ganre,
    'votes.imdb': votesImdb,
  });
}

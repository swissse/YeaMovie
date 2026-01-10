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
  ganre: string;
  sortType: string[];
  sortField: string[];
}

interface getTitleRowTrendingProps {
  type: string;
  limit: number;
  page: number;
  sortType: string[];
  sortField: string[];
  premiereWorld?: string[];
  votesImdb?: string;
  ratingImdb?: string;
  year?: string[];
}

interface getSearchValueProps {
  limit: number;
  page: number;
  name: string;
  sortType: string[];
  sortField: string[];
}

export function getBannerInfo(): Pesponse {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    type: 'movie',
    limit: 4,
    page: 1,
    year: '2000-2025',
    sortField: ['votes.imdb'],
    sortType: ['-1'],
  });
}

export function getGanreRow({
  type,
  limit,
  page,
  ganre,
  sortType,
  sortField,
}: getGanreRowProps): Pesponse {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    type,
    limit,
    sortType,
    page,
    'genres.name': ganre,
    sortField,
  });
}

export function getTitleRowTrending({
  type,
  limit,
  page,
  sortType,
  sortField,
}: getTitleRowTrendingProps) {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    type,
    limit,
    page,
    sortType,
    sortField,
  });
}

export function getTitleRowNew({
  type,
  limit,
  page,
  sortType,
  sortField,
  premiereWorld,
  votesImdb,
}: getTitleRowTrendingProps) {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    type,
    limit,
    page,
    sortType,
    sortField,
    'premiere.world': premiereWorld,
    'votes.imdb': votesImdb,
  });
}

export function getSearchValue({ limit, page, name, sortField, sortType }: getSearchValueProps) {
  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    limit,
    page,
    name,
    sortField,
    sortType,
  });
}

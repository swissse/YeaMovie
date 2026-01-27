import useFetch from '../../../shared/hooks/useFetch';

export function useSearch(params: { page: number; limit: number; query?: string; genre?: string }) {
  if (params.query) {
    return useFetch('https://api.poiskkino.dev/v1.4/movie/search', {
      page: params.page,
      limit: params.limit,
      query: params.query,
    });
  }

  return useFetch('https://api.poiskkino.dev/v1.4/movie', {
    page: params.page,
    limit: params.limit,
    'genres.name': params.genre,
    'premiere.world': ['01.01.2000-31.12.2026'],
    sortField: ['votes.imdb'],
    sortType: ['-1'],
  });
}

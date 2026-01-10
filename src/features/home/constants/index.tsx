export const GanreRowRequest = {
  type: 'movie',
  limit: 4,
  page: 1,
  sortField: ['votes.imdb'],
  sortType: ['-1'],
};

export const TitleRowRequestTrending = {
  limit: 5,
  page: 1,
  sortField: ['votes.imdb'],
  sortType: ['-1'],
};

export const TitleRowRequestNew = {
  limit: 5,
  page: 1,
  votesImdb: '50000-9999999',
  premiereWorld: ['01.01.2025-31.12.2026'],
  sortField: ['premiere.world'],
  sortType: ['-1'],
};

export const SearchValueRequest = {
  limit: 12,
  page: 1,
};

export const ganre = [
  'боевик',
  'ужасы',
  'драма',
  'комедия',
  'фантастика',
  'военный',
  'детектив',
  'криминал',
  'триллер',
  'спорт',
];

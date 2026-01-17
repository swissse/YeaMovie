export interface MovieResponse {
  id: number;
  externalId?: {
    kpHD?: string;
    imdb?: string;
    tmdb?: number;
  };

  name: string;
  alternativeName?: string;
  enName?: string;
  names?: {
    name: string;
    language: string;
    type: string;
  }[];

  type: string;
  typeNumber?: number;
  year?: number;
  description?: string;
  shortDescription?: string;
  slogan?: string;
  status?: string;

  rating: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };

  votes: {
    kp?: number | string;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };

  movieLength?: number;
  ratingMpaa?: string;
  ageRating?: number;

  logo?: { url: string };
  poster?: {
    url: string;
    previewUrl?: string;
  };
  backdrop?: {
    url: string;
    previewUrl?: string;
  };

  videos?: {
    trailers: {
      url: string;
      name: string;
      site: 'youtube' | string;
      size?: number;
      type: 'TRAILER' | string;
    }[];
  };

  genres?: { name: string }[];
  countries?: { name: string }[];
  persons: {
    id: number;
    photo?: string;
    name: string;
    enName?: string;
    description?: string;
    profession?: string;
    enProfession?: string;
  }[];

  premiere?: {
    country?: string;
    world?: string; // ISO date
    russia?: string;
    cinema?: string;
    digital?: string;
    bluray?: string;
    dvd?: string;
  };

  similarMovies?: ShortMovie[];
  sequelsAndPrequels?: ShortMovie[];

  isSeries?: boolean;
  seasonsInfo?: {
    number: number;
    episodesCount: number;
  }[];
  seriesLength?: number;
  totalSeriesLength?: number;
  releaseYears?: {
    start: number;
    end?: number;
  }[];

  top10?: number;
  top250?: number;
  ticketsOnSale?: boolean;
  audience?: {
    count: number;
    country: string;
  }[];

  lists?: string[];
  createdAt: string;
  updatedAt: string;
}

type ShortMovie = {
  id: number;
  name: string;
  enName?: string;
  alternativeName?: string;
  type: string;
  year?: number;
  poster?: {
    url: string;
    previewUrl?: string;
  };
  rating: {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
  };
};

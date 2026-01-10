export interface Film {
  id: number;
  alternativeName: string;
  name: string;
  shortDescription: string;
  backdrop?: {
    url: string;
    previewUrl: string;
  };
  poster?: {
    url: string;
    previewUrl: string;
  };
  movieLength: number;
  year: number;
  rating: {
    imdb: number;
    kp: number;
  };
  genres: { name: string }[];
  type: string;
}

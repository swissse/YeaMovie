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
}

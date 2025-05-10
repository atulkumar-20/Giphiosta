import { GiphyFetch } from '@giphy/js-fetch-api';

// Interface for individual GIF data
export interface GifData {
  id: string;
  type: string;
  slug: string;
  title: string;
  images: {
    fixed_width: {
      webp: string;
    };
    [key: string]: any;
  };
  user?: {
    avatar_url: string;
    display_name: string;
  };
}

// Type for filter values
export type FilterType = 'gifs' | 'stickers' | 'text';

// Interface for the GIF context
export interface GifContextType {
  gf: GiphyFetch;
  gifs: GifData[];
  setGifs: React.Dispatch<React.SetStateAction<GifData[]>>;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  favorites: GifData[];
  setFavorites: React.Dispatch<React.SetStateAction<GifData[]>>;
  addToFavorites: (id: string) => void;
}

// Empty context default value
export const defaultGifContextValue: GifContextType = {
  gf: {} as GiphyFetch, // This will be initialized properly in the provider
  gifs: [],
  setGifs: () => {},
  filter: 'gifs',
  setFilter: () => {},
  favorites: [],
  setFavorites: () => {},
  addToFavorites: () => {},
};

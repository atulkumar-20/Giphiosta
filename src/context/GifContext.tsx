/* eslint-disable @typescript-eslint/no-unused-vars */
import { GiphyFetch } from '@giphy/js-fetch-api';
import { createContext, useContext, useState } from 'react';
import type { GifContextType, GifData, FilterType } from '../types/gif.types';

const GifContext = createContext<GifContextType>({
  gf: {} as GiphyFetch,
  gifs: [],
  setGifs: () => {},
  filter: 'gifs',
  setFilter: () => {},
  favorites: [],
  setFavorites: () => {},
});

const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [filter, setFilter] = useState<FilterType>('gifs');
  const [favorites, setFavorites] = useState<GifData[]>([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favorites, setFavorites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};
export default GifProvider;

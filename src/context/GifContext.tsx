/* eslint-disable @typescript-eslint/no-unused-vars */
import { GiphyFetch } from '@giphy/js-fetch-api';
import { createContext, useContext, useState } from 'react';

const GifContext = createContext<Record<string, unknown>>({});

const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState('gifs');
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filter, setFilter, favorites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};
export default GifProvider;

import { GiphyFetch } from '@giphy/js-fetch-api';
import { createContext, useContext, useEffect, useState } from 'react';
import type { GifContextType, GifData, FilterType } from '../types/gif.types';

const GifContext = createContext<GifContextType>({
  gf: {} as GiphyFetch,
  gifs: [],
  setGifs: () => {},
  filter: 'gifs',
  setFilter: () => {},
  favorites: [],
  setFavorites: () => {},
  addToFavorites: () => {},
});

const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [filter, setFilter] = useState<FilterType>('gifs');
  const [favorites, setFavorites] = useState<GifData[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('FavoriteGIFs');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  const addToFavorites = async (id: string) => {
    // Check if already in favorites
    if (favorites.some((item) => item.id === id)) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(updatedFavorites);
      localStorage.setItem('FavoriteGIFs', JSON.stringify(updatedFavorites));
    } else {
      try {
        // Find the GIF in existing gifs array first
        let gifToAdd = gifs.find((gif) => gif.id === id);

        // If not found in current gifs, fetch it from API
        if (!gifToAdd) {
          const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
          const { data } = await gf.gifs([id]);

          if (data[0]) {
            gifToAdd = {
              id: data[0].id.toString(),
              type: data[0].type,
              slug: data[0].slug,
              title: data[0].title,
              images: data[0].images,
              user: data[0].user,
            };
          }
        }

        // Add to favorites if found
        if (gifToAdd) {
          const updatedFavorites = [...favorites, gifToAdd];
          setFavorites(updatedFavorites);
          localStorage.setItem(
            'FavoriteGIFs',
            JSON.stringify(updatedFavorites),
          );
        }
      } catch (error) {
        console.error('Error adding GIF to favorites:', error);
      }
    }
  };

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
        addToFavorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;

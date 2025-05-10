import { useEffect, useState } from 'react';
import { GifState } from '../context/GifContext';
import type { GifData } from '../types/gif.types';
import { Gif } from '../components/Gif';

export const Favorites = () => {
  const [favoriteGifs, setFavoriteGifs] = useState<GifData[]>([]);
  const { gf, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    // Check if there are any favorites before making the API call
    if (!favorites || favorites.length === 0) {
      setFavoriteGifs([]);
      return;
    }
    
    try {
      // Extract IDs from favorites array
      const favoriteIds = favorites.map(fav => fav.id);
      
      // Make API call only if we have valid IDs
      if (favoriteIds.length > 0) {
        const { data: gifs } = await gf.gifs(favoriteIds);
        
        // Map the returned gifs to match GifData type
        setFavoriteGifs(gifs.map(gif => ({
          ...gif,
          id: gif.id.toString()
        })));
      }
    } catch (error) {
      console.error('Error fetching favorite GIFs:', error);
      setFavoriteGifs([]);
    }
  };

  // Re-fetch when favorites change
  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favorites]);

  return (
    <>
      <div className="mt-2">
        <span className="text-2xl font-bold">My Favorites</span>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {favoriteGifs.length > 0 ? (
            favoriteGifs.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))
          ) : (
            <p>No favorite GIFs yet. Click the heart icon on any GIF to add it to your favorites!</p>
          )}
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GifState } from '../context/GifContext';
import { Gif } from '../components/Gif';
import type { GifData } from '../types/gif.types';

export const Search = () => {
  const [searchResults, setSearchResults] = useState<GifData[]>([]);
  const { query } = useParams();
  const { gf, filter } = GifState();

  const fetchSearchResults = async () => {
    const { data } = await gf.search(query ?? '', {
      sort: 'relevant',
      lang: 'en',
      limit: 20,
      type: filter,
      rating: 'g',
    });
    setSearchResults(
      data.map((gif) => ({
        ...gif,
        id: gif.id.toString(),
      })),
    );
  };
  useEffect(() => {
    fetchSearchResults();
  }, [filter]);

  return (
    <>
      <div className="my-4">
        <h2>{query}</h2>
        {searchResults.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
            {searchResults.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        ) : (
          <span>
            No GIFs found for {query}. Try searching for Stickers instead?
          </span>
        )}
      </div>
    </>
  );
};

import { useEffect } from 'react';
import { GifState } from '../context/GifContext';
import { Gif } from '../components/Gif';
import { FilterGif } from '../components/FilterGif';

export const Home = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrendingGIFs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: 'g',
    });
    setGifs(data.map(gif => ({
      ...gif,
      id: gif.id.toString()
    })));
  };

  // whenever the filter changes, it re-fetches from the API
  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);
  return (
    <>
      <div className="Home">
        <img
          src="/banner.gif"
          alt="earth banner"
          className="mt-2 rounded w-full"
        />
        {/* FilterGifs */}
        <FilterGif showTrending={true} />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {gifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      </div>
    </>
  );
};

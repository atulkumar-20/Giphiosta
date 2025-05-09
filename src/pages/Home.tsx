import { useEffect } from 'react';
import { GifState } from '../context/GifContext';
import { Gif } from '../components/Gif';

export const Home = () => {
  const { gf, gifs, setGifs, filter, setFilter } = GifState();

  const fetchTrendingGIFs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: 'g',
    });
    setGifs(data);
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
        <div className="">
          {gifs.map((gif) => (
            <Gif />
          ))}
        </div>
      </div>
    </>
  );
};

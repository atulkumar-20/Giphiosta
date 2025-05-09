import { useEffect, useState } from 'react';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { GifState } from '../context/GifContext';

export const Header = () => {
  const [categories, setCategories] = useState<
    { name: string; name_encoded: string }[]
  >([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, filter, setFilter, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    console.log('GiphyFetch object:', gf);
    fetchGifCategories();
  }, []);

  return (
    <>
      <nav>
        <div className="relative flex gap-4 justify-between items-center mb-2">
          <Link to="/" className="flex-gap-2">
            <img src="/logo.svg" alt="Giphy" className="w-8" />
            <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
              Giphiosta
            </h1>
          </Link>
          <div className="font-bold text-md flex gap-2 items-center">
            {categories?.slice(0, 5)?.map((category) => {
              return (
                <Link
                  key={category.name}
                  to={`/${category.name_encoded as string}`}
                  className="px-4 py-1 border-b-4 hidden lg:block transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600"
                >
                  {category.name}
                </Link>
              );
            })}

            <button onClick={() => setShowCategories(!showCategories)}>
              <HiEllipsisVertical
                size={35}
                className={`py-0.5 transition-all duration-300 ease-in-out ${
                  showCategories
                    ? 'bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600'
                    : ''
                } border-b-4 hidden lg:block hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600`}
              />
            </button>
            {favorites.length > 0 && (
              <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                <Link to="/favorites">Favorites GIFs</Link>
              </div>
            )}
            <button>
              <HiMiniBars3BottomRight
                className="text-sky-400 block lg:hidden"
                size={30}
              />
            </button>
          </div>
          {showCategories && (
            <div className="absolute top-20 left-0 right-0 px-10 pt-6 pb-9 w-full z-20 bg-gradient-to-r from-teal-600 via-blue-600 to-pink-600 rounded-b-lg shadow-lg">
              <span className="text-xl font-bold">Categories</span>
              <hr className="my-3 border-white/30" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                {categories?.map((category) => {
                  return (
                    <Link
                      key={category.name}
                      to={`/${category.name_encoded as string}`}
                      className="font-bold"
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {/* Search */}
      </nav>
    </>
  );
};

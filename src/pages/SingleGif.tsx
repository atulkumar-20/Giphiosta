import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GifState } from '../context/GifContext';
import type { GifData } from '../types/gif.types';
import { Gif } from '../components/Gif';
import { HiOutlineExternalLink } from 'react-icons/hi';
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from 'react-icons/hi2';
import { FaPaperPlane } from 'react-icons/fa6';
import { IoCodeSharp } from 'react-icons/io5';
import { FollowOn } from '../components/FollowOn';

const contentType = ['gif', 'gifs', 'sticker', 'stickers', 'text', 'texts'];

export const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState<any>({});
  const [relatedGifs, setRelatedGifs] = useState<GifData[]>([]);
  const [readMore, setReadMore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  const handleFavoriteClick = (id: string) => {
    addToFavorites(id);
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    // Check if current gif is in favorites
    if (gif?.id && favorites.some((fav) => fav.id === gif.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, gif]);

  useEffect(() => {
    if (type && !contentType.includes(type)) {
      throw new Error('Invalid Content Type');
    }

    const fetchGif = async () => {
      const gifId = slug?.split('-');
      const lastId = gifId?.[gifId?.length - 1] || '';

      try {
        // Make sure we're passing a valid ID
        if (!lastId) return;

        const { data } = await gf.gifs([lastId]);
        setGif(data[0]);

        // For related GIFs, ensure we're passing valid parameters
        const { data: related } = await gf.related(lastId, {
          limit: 10,
          type: 'gifs', // Explicitly set type to avoid validation errors
        });

        const typedRelatedGifs: GifData[] = related.map((item: any) => ({
          id: item.id.toString(),
          type: item.type,
          slug: item.slug,
          title: item.title,
          images: item.images,
          user: item.user,
        }));

        setRelatedGifs(typedRelatedGifs);
      } catch (error) {
        console.error('Error fetching GIF data:', error);
      }
    };

    fetchGif();
  }, [slug, type, gf]);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <>
                <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                  {readMore
                    ? gif?.user?.description
                    : gif?.user?.description.slice(0, 100) + '...'}
                </p>
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />

        {gif?.source && (
          <div>
            <span className="font-bold text-sm text-gray-400">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* -- Mobile UI -- */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>

              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
            {/* -- Mobile UI -- */}
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => gif?.id && handleFavoriteClick(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={isFavorite ? 'text-red-500' : ''}
              />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </button>
            <button
              // onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              // onClick={EmbedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

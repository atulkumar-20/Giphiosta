import { Link } from 'react-router-dom';

interface GifData {
  type: string;
  slug: string;
  title: string;
  images: {
    fixed_width: {
      webp: string;
    };
  };
  user?: {
    avatar_url: string;
    display_name: string;
  };
}

export const Gif = ({
  gif,
  hover = true,
}: {
  gif: GifData;
  hover?: boolean;
}) => {
  return (
    <>
      {/* When clicked, this link will navigate to a URL like /gif/baseball-bat-bugs-bunny-xUA7be0s1t2nTT56rS, which matches the route pattern /:type/:slug defined in your App.tsx that renders the SingleGif component. */}
      <Link to={`/${gif.type}s/${gif.slug}`}>
        <div className="w-full mb-2 relative cursor-pointer group aspect-video">
          <img
            src={gif?.images?.fixed_width.webp}
            alt={gif?.title}
            className="w-full object-cover rounded transition-all duration-300"
          />
          {hover && (
            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from transparent via-transparent to-black font-bold flex items-end gap-2 p-2">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-8"
              />
              <span>{gif?.user?.display_name}</span>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

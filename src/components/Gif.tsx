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
}

export const Gif = ({gif,hover = true,}: {gif: GifData;hover?: boolean;
}) => {
  return (
    <>
      {/* When clicked, this link will navigate to a URL like /gif/baseball-bat-bugs-bunny-xUA7be0s1t2nTT56rS, which matches the route pattern /:type/:slug defined in your App.tsx that renders the SingleGif component. */}
      <Link to={`${gif.type}/${gif.slug}`}>
        <div className="w-full mb-2 relative cursor-pointer">
          <img
            src={gif?.images?.fixed_width.webp}
            alt={gif?.title}
            className="w-full object-cover rounded transition-all duration-300"
          />
        </div>
      </Link>
    </>
  );
};

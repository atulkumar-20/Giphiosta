import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayouts } from './layouts/AppLayouts';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Category } from './pages/Category';
import { SingleGif } from './pages/SingleGif';
import { Favorites } from './pages/Favorites';
import GifProvider from './context/GifContext';

const router = createBrowserRouter([
  {
    element: <AppLayouts />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:category',
        element: <Category />,
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/:type/:slug',
        element: <SingleGif />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <GifProvider>
        <RouterProvider router={router} />
      </GifProvider>
    </>
  );
};
export default App;

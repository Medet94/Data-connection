import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page (заглушка)</div>,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// временно роуты пустые, добавим позже
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page (заглушка)</div>,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Page } from 
import { Dashboard } from '@/pages/dashboard';
import { NotFound } from '@/pages/not-found';

const router = createBrowserRouter([
  { path: '/', element: <Page /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <NotFound /> },
]);

export const AppRouter = () => <RouterProvider router={router} />;

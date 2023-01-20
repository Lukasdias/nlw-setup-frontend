import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import { Home } from '../pages/home';
import { AppContainer } from './app-container';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};

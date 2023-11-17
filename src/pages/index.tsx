import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes as RouterDOMRoutes,
  Route
} from 'react-router-dom';

import { Routes } from 'constants/routes';

import MainLayout from 'containers/MainLayout';
import Spinner from 'components/Spinner';

const List = lazy(() => import('./List'));

const Pages = () => {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <Spinner />
        </MainLayout>
      }
    >
      <BrowserRouter>
        <RouterDOMRoutes>
          <Route
            path={Routes.List}
            element={
              <MainLayout>
                <List />
              </MainLayout>
            }
          />
        </RouterDOMRoutes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Pages;

import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main';
import Layouts from '../layouts/layouts';

import '../../scss/app.scss';

const CartPage = React.lazy(
  () => import(/* webpackChunkName: "cart" */ '../../pages/cart'),
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "fullPizza" */ '../../pages/fullPizza'),
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "notFound" */ '../../pages/notFound'),
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/pizza-item/:id"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

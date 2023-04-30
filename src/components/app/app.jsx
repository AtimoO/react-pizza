import React from 'react';
import { CartPage, MainPage, NotFound, FullPizza } from '../../pages';
import { Route, Routes } from 'react-router-dom';

import '../../scss/app.scss';
import Layouts from '../layouts/layouts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pizza-item/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

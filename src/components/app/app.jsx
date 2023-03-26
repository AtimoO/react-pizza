import React from 'react';
import Header from '../header/header';
import { CartPage, MainPage, NotFound } from '../../pages';
import { Route, Routes } from 'react-router-dom';

import '../../scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

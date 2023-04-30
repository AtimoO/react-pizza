import React from 'react';
import Header from '../header/header';
import { CartPage, MainPage, NotFound } from '../../pages';
import { Route, Routes } from 'react-router-dom';

import '../../scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />

      <main className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import Header from '../header/header';
import { CartPage, MainPage, NotFound } from '../../pages';
import { Route, Routes } from 'react-router-dom';

import '../../scss/app.scss';

export const AppContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

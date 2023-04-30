import React from 'react';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';

const Layouts = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
export default Layouts;

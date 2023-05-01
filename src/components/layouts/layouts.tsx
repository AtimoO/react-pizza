import { FC } from 'react';
import Header from '../header/header';
import { Outlet } from 'react-router-dom';

const Layouts: FC = () => {
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

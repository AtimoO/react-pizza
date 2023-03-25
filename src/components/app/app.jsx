import React from 'react';
import Header from '../header/header';
import Categories from '../categories/categories';
import Sort from '../sort/sort';
import PizzaItem from '../pizza-item/pizza-item';
import '../../scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaItem title="Пицца тип 1" price={500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

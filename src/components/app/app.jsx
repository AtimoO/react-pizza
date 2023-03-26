import React from 'react';
import Header from '../header/header';
import Categories from '../categories/categories';
import Sort from '../sort/sort';
import PizzaItem from '../pizza-item/pizza-item';

import '../../scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://642008d025cb657210411d98.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

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
            {items.map((pizza, index) => (
              <PizzaItem key={index} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

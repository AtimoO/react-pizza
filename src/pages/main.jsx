import React from 'react';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';

export const MainPage = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://642008d025cb657210411d98.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => (
              <SkeletonPizzaItem key={index} />
            ))
          : items.map((pizza, index) => <PizzaItem key={index} {...pizza} />)}
      </div>
    </div>
  );
};

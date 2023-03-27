import React from 'react';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';

export const MainPage = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const [sorting, setSorting] = React.useState('asc');

  React.useEffect(() => {
    setIsLoading(true);

    const urlCategory = categoryId === 0 ? '' : `category=${categoryId}&`;

    fetch(
      `https://642008d025cb657210411d98.mockapi.io/items?${urlCategory}sortBy=${sortType.sortProperty}&order=${sorting}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sorting]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onClickSort={(id) => setSortType(id)}
          sorting={sorting}
          onClickSorting={(id) => setSorting(id)}
        />
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

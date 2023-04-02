import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../services/slices/sortSlice';
import { AppContext } from '../components/app/app';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';

export const MainPage = () => {
  const { categoryId, sortRanking, sortType } = useSelector(
    (state) => state.sort,
  );
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  const pizzas = items.map((pizza, index) => (
    <PizzaItem key={index} {...pizza} />
  ));

  // Фильтрация на стороне фронта
  // const pizzas = items
  // .filter((pizza) =>
  //   pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
  // )
  // .map((pizza, index) => <PizzaItem key={index} {...pizza} />);

  React.useEffect(() => {
    setIsLoading(true);

    const urlCategory = categoryId === 0 ? '' : `category=${categoryId}&`;
    const urlSearch = searchValue === '' ? '' : `search=${searchValue}&`;

    fetch(
      `https://642008d025cb657210411d98.mockapi.io/items?page=${currentPage}&limit=4&${urlSearch}${urlCategory}sortBy=${sortType.sortProperty}&order=${sortRanking}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortRanking, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => dispatch(setCategory(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => (
              <SkeletonPizzaItem key={index} />
            ))
          : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

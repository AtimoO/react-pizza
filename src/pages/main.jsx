import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setPageCount } from '../services/slices/sortSlice';
import { AppContext } from '../components/app/app';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';

export const MainPage = () => {
  const { categoryId, sortRanking, sortType, currnetPage } = useSelector(
    (state) => state.sort,
  );
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const pizzas = items.map((pizza, index) => (
    <PizzaItem key={index} {...pizza} />
  ));

  // Фильтрация на стороне фронта
  // const pizzas = items
  // .filter((pizza) =>
  //   pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
  // )
  // .map((pizza, index) => <PizzaItem key={index} {...pizza} />);

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const urlCategory = categoryId === 0 ? '' : `category=${categoryId}&`;
    const urlSearch = searchValue === '' ? '' : `search=${searchValue}&`;

    axios
      .get(
        `https://642008d025cb657210411d98.mockapi.io/items?page=${currnetPage}&limit=4&${urlSearch}${urlCategory}sortBy=${sortType.sortProperty}&order=${sortRanking}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortRanking, searchValue, currnetPage]);

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
      <Pagination currnetPage={currnetPage} onChangePage={onChangePage} />
    </div>
  );
};

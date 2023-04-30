/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSort,
  setCategory,
  setFilters,
  setPageCount,
} from '../services/slices/sortSlice';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizza } from '../services/slices/pizzaSlice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { categoryId, sortRanking, sortType, currnetPage, searchValue } =
    useSelector(selectSort);
  const { items, status } = useSelector(selectPizza);
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  let showLimitPizzas = 4;

  const pizzas = items.map((pizza, index) => (
    <PizzaItem key={index} {...pizza} />
  ));

  // Фильтрация на стороне фронта
  // const pizzas = items
  // .filter((pizza) =>
  //   pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
  // )
  // .map((pizza, index) => <PizzaItem key={index} {...pizza} />);

  const getPizzas = async () => {
    const urlCategory = categoryId === 0 ? '' : `category=${categoryId}&`;
    const urlSearch = searchValue === '' ? '' : `search=${searchValue}&`;

    dispatch(
      fetchPizzas({
        currnetPage,
        showLimitPizzas,
        urlSearch,
        urlCategory,
        sortProperty: sortType.sortProperty,
        sortRanking,
      }),
    );
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, sortRanking, searchValue, currnetPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryId,
        page: currnetPage,
        sortBy: sortType,
        order: sortRanking,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, sortRanking, searchValue, currnetPage]);

  if (status === 'error') {
    return (
      <>
        <h2>Произошла ошибка!</h2>
      </>
    );
  }

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
        {status === 'loading'
          ? [...new Array(showLimitPizzas)].map((_, index) => (
              <SkeletonPizzaItem key={index} />
            ))
          : pizzas}
      </div>
      <Pagination currnetPage={currnetPage} onChangePage={onChangePage} />
    </div>
  );
};

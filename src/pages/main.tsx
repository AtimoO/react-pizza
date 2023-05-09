/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../services/store';
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
  const dispatch = useAppDispatch();
  const { categoryId, sortRanking, sortType, currentPage, searchValue } =
    useSelector(selectSort);
  const { items, status } = useSelector(selectPizza);
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  let showLimitPizzas = 4;

  const pizzas = items.map((pizza: any, index: number) => (
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
        currentPage,
        showLimitPizzas,
        urlSearch,
        urlCategory,
        sortProperty: sortType.sortProperty,
        sortRanking,
      }),
    );
  };

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  const onChangeCategory = useCallback(
    (id: number) => dispatch(setCategory(id)),
    [],
  );

  useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, sortRanking, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: categoryId,
        page: currentPage,
        sortBy: sortType,
        order: sortRanking,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, sortRanking, searchValue, currentPage]);

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
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort sortRanking={sortRanking} sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(showLimitPizzas)].map((_, index) => (
              <SkeletonPizzaItem key={index} />
            ))
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setFilters,
  setPageCount,
} from '../services/slices/sortSlice';
import { AppContext } from '../components/app/app';
import Categories from '../components/categories/categories';
import PizzaItem from '../components/pizza-item/pizza-item';
import SkeletonPizzaItem from '../components/pizza-item/skeleton-pizza-Item';
import Sort from '../components/sort/sort';
import Pagination from '../components/pagination/pagination';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const { categoryId, sortRanking, sortType, currnetPage } = useSelector(
    (state) => state.sort,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
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

  const fetchPizzas = () => {
    setIsLoading(true);

    const urlCategory = categoryId === 0 ? '' : `category=${categoryId}&`;
    const urlSearch = searchValue === '' ? '' : `search=${searchValue}&`;
    axios
      .get(
        `https://642008d025cb657210411d98.mockapi.io/items?page=${currnetPage}&limit=${showLimitPizzas}&${urlSearch}${urlCategory}sortBy=${sortType.sortProperty}&order=${sortRanking}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
      fetchPizzas();
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

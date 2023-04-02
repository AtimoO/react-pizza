import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortRanking, setSortType } from '../../services/slices/sortSlice';

const listSort = [
  {
    name: 'популярности',
    sortProperty: 'rating',
  },
  {
    name: 'цене',
    sortProperty: 'price',
  },
  {
    name: 'алфавиту',
    sortProperty: 'title',
  },
];

const Sort = () => {
  const { sortRanking, sortType } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const handlerClickSort = (objType) => {
    console.log(objType);
    dispatch(setSortType(objType));
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          onClick={() => {
            const type = sortRanking === 'asc' ? 'desc' : 'asc';
            dispatch(setSortRanking(type));
          }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform={
            sortRanking === 'asc'
              ? 'matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)'
              : ''
          }
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {listSort.map((objSort) => (
              <li
                key={objSort.name}
                onClick={() => handlerClickSort(objSort)}
                className={
                  objSort.sortProperty === sortType.sortProperty ? 'active' : ''
                }
              >
                {objSort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;

import React from 'react';

const Sort = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState(0);
  const [typeSort, setTypeSort] = React.useState('');

  const listSort = ['популярности', 'цене', 'алфавиту'];
  const sortName = listSort[activeSort];

  const handlerClickSort = (index) => {
    setActiveSort(index);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          onClick={() => {
            typeSort === ''
              ? setTypeSort(
                  'matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)',
                )
              : setTypeSort('');
          }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform={typeSort}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortName}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {listSort.map((sortName, i) => (
              <li
                key={sortName}
                onClick={() => handlerClickSort(i)}
                className={i === activeSort ? 'active' : ''}
              >
                {sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;

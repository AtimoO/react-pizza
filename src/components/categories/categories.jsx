import React from 'react';

const mokeCategories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {mokeCategories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;

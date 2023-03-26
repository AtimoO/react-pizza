import React from 'react';

const mokeCategories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {mokeCategories.map((category, index) => (
          <li
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
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

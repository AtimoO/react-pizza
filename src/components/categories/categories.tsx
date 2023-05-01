import { FC } from 'react';

const mokeCategories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

interface ICategoriesProps {
  value: number;
  onClickCategory: (id: number) => any;
}

const Categories: FC<ICategoriesProps> = ({ value, onClickCategory }) => {
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

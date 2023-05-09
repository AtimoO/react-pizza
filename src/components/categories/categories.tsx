import { FC, memo } from 'react';
import { mokeCategories } from '../../utils/constants';

interface ICategoriesProps {
  value: number;
  onClickCategory: (id: number) => void;
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
export default memo(Categories);

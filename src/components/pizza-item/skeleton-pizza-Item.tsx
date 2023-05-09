import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonPizzaItem: FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="120" />
    <rect x="0" y="281" rx="15" ry="15" width="280" height="21" />
    <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
    <rect x="126" y="418" rx="20" ry="20" width="150" height="45" />
    <rect x="0" y="427" rx="10" ry="10" width="90" height="27" />
  </ContentLoader>
);

export default SkeletonPizzaItem;

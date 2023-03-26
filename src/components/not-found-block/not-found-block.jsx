import React from 'react';
import styles from './not-found-block.module.scss';

const NotFoundBlock = () => {
  return (
    <>
      <h1 className={styles.content}>
        Ничего не найдено, ошибка <span>404</span>{' '}
        😕
      </h1>
    </>
  );
};
export default NotFoundBlock;

import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

const Pagination = ({ onChangePage }) => {
  return (
    <div className={styles.container}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default Pagination;

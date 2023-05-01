import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

interface IPaginationProps {
  currentPage: number;
  onChangePage: (e: number) => void;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, onChangePage }) => {
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
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default Pagination;

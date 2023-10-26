import classnames from 'classnames';

import styles from './Pagination.module.scss';
import { MORE, PaginationOptions, usePagination } from '../../hooks/usePagination';

type OwnProps = {
  onPageChange: (page: number) => void;
  className?: string;
  propsMessage?: string;
} & PaginationOptions;

const componentName = 'Pagination';

const Pagination = (props: OwnProps) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const { onNext, onPrevious, paginationRange } = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    onPageChange,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  console.log(`${props.propsMessage}${componentName}`);
  return (
    <ul className={classnames(styles.paginationContainer, { [className ?? '']: className })}>
      <li
        className={classnames(styles.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={classnames(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === MORE) {
          return <li className={classnames(styles.paginationItem, styles.MORE)}>&#8230;</li>;
        }

        return (
          <li
            className={classnames(styles.paginationItem, {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classnames(styles.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={classnames(styles.arrow, styles.left)} />
      </li>
    </ul>
  );
};

export default Pagination;

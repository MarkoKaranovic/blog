import React from 'react';
import { range } from '../utils';
export const MORE = '...';

export type PaginationOptions = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
  onPageChange,
}: PaginationOptions) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftMORE = leftSiblingIndex > 2;
    const shouldShowRightMORE = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftMORE && shouldShowRightMORE) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, MORE, totalPageCount];
    }

    if (shouldShowLeftMORE && !shouldShowRightMORE) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, MORE, ...rightRange];
    }

    if (shouldShowLeftMORE && shouldShowRightMORE) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, MORE, ...middleRange, MORE, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  const onNext = React.useCallback(() => {
    onPageChange(currentPage + 1);
  }, []);

  const onPrevious = React.useCallback(() => {
    onPageChange(currentPage - 1);
  }, []);

  return { onNext, onPrevious, paginationRange };
};

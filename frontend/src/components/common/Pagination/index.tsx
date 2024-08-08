import React from 'react';

import PageNumbers from './PageNumbers';

interface PaginationControlsProps {
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalRows: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  setCurrentPage,
  totalRows,
}) => {
  return (
    <div className="grid grid-cols-12 mt-3 -ml-40">
      <div className="col-span-12 relative flex-wrap  w-full pb-2 sm:pb-12 pt-1 ">
        <PageNumbers
          length={totalRows}
          currentPage={currentPage}
          gotoPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaginationControls;

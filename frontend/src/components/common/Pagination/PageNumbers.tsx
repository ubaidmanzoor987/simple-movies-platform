import React, { useCallback, useState } from 'react';

interface ButtonProps {
  content: React.ReactNode;
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  active,
  disabled,
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center text-headingColor ${
        !disabled && 'hover:text-white hover:bg-primary cursor-pointer'
      } rounded-lg w-10 h-10 text-sm font-medium
      ${active ? 'bg-primary mb-3' : 'bg-[#092C39]'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

interface PaginationNavProps {
  gotoPage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageToken?: string[];
  showNumbers?: boolean;
  length: number;
  currentPage?: number;
  pageSize?: number;
}

const PaginationNav: React.FC<PaginationNavProps> = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  showNumbers = true,
  currentPage,
}) => {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    let outOfRange = false;
    const pageHtml = [];

    for (let i = 1; i <= pageCount; i++) {
      if (i <= 2 || i >= pageCount - 1 || Math.abs(i - pageIndex) <= 2) {
        outOfRange = false;
        pageHtml.push(
          <li key={i} className={`hidden w-full sm:flex `}>
            <Button
              content={i}
              onClick={() => gotoPage(i)}
              active={i === pageIndex}
            />
          </li>
        );
      } else {
        if (!outOfRange) {
          pageHtml.push(
            <span
              key={`ellipsis-${i}`}
              className="items-center w-full bg-primary px-4 text-sm font-medium hidden sm:flex"
            >
              ...
            </span>
          );
        }

        outOfRange = true;
      }
    }

    return pageHtml;
  }, [pageCount, pageIndex, gotoPage]);

  return (
    <ul className="flex gap-2 w-full absolute ">
      <li>
        <button
          className={`inline-flex w-full py-2 px-3 rounded-lg items-center justify-center  text-sm font-bold text-headingColor ${
            canPreviousPage
              ? 'hover:bg-brand hover:text-headingColor cursor-pointer'
              : 'text-gray-300'
          } `}
          onClick={() => gotoPage(pageIndex > 0 ? pageIndex - 1 : 1)}
          disabled={!canPreviousPage}
        >
          Prev
        </button>
      </li>
      <div className="flex gap-2 w-auto ">
        {showNumbers && renderPageLinks()}
      </div>
      <li>
        <button
          className={`inline-flex w-full py-2 px-3 rounded-lg items-center justify-center  text-sm font-bold text-subHeadingColor ${
            canNextPage
              ? 'hover:bg-brand hover:text-white cursor-pointer'
              : 'text-gray-300'
          } 
          `}
          onClick={() =>
            gotoPage(pageIndex < pageCount ? pageIndex + 1 : pageIndex)
          }
        >
          Next
        </button>
      </li>
    </ul>
  );
};

interface PageNumbersProps {
  gotoPage?: (page: number) => void;
  pageToken?: string[];
  length: number;
  showNumbers?: boolean;
  currentPage?: number;
}

const PageNumbers: React.FC<PageNumbersProps> = ({
  gotoPage,
  pageToken,
  length,
  showNumbers = true,
  currentPage,
}) => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const pageSize = 10;
  let pageCount = 0;
  if (pageSize) {
    pageCount = Math.ceil(length / pageSize);
  }

  const onClickGoTo = (i: number) => {
    setPageIndex(i);
    if (gotoPage) gotoPage(i);
  };

  return (
    <PaginationNav
      gotoPage={onClickGoTo}
      canPreviousPage={pageIndex > 1}
      canNextPage={pageIndex < pageCount}
      pageCount={pageCount}
      pageIndex={pageIndex}
      pageToken={pageToken}
      showNumbers={showNumbers}
      length={length}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default PageNumbers;

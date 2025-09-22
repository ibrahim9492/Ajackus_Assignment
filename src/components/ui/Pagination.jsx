// src/components/ui/Pagination.jsx
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Items per page:
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="secondary"
          className="text-sm"
        >
          Previous
        </Button>
        <div className="flex gap-1">
          {startPage > 1 && (
            <>
              <Button
                onClick={() => onPageChange(1)}
                variant="secondary"
                className="text-sm"
              >
                1
              </Button>
              {startPage > 2 && <span className="self-center">...</span>}
            </>
          )}
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => onPageChange(number)}
              variant={currentPage === number ? "primary" : "secondary"}
              className="text-sm"
            >
              {number}
            </Button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="self-center">...</span>
              )}
              <Button
                onClick={() => onPageChange(totalPages)}
                variant="secondary"
                className="text-sm"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

export default Pagination;

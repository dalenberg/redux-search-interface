import React from "react";
import { numberToLocale } from "../../helpers";
import "./style.css";

const Pagination = ({
  total,
  currentPage,
  itemsPerPage,
  handleChange,
  show
}) => {
  const lastPage = Math.ceil(total / itemsPerPage);

  if (!show) {
    return null;
  }

  return (
    <div className="Pagination">
      {currentPage !== 1 && (
        <span
          className="Pagination-link Pagination-link--previous"
          onClick={() => handleChange(currentPage - 1)}
        >
          Previous
        </span>
      )}
      <span className="Pagination-item Pagination-info">
        Page {numberToLocale(currentPage)} of {numberToLocale(lastPage)}
      </span>
      {currentPage !== lastPage && (
        <span
          className="Pagination-link Pagination-link--next"
          onClick={() => handleChange(currentPage + 1)}
        >
          Next
        </span>
      )}
    </div>
  );
};

export default Pagination;

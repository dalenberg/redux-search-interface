import React from "react";
import "./style.css";

const SearchFilter = ({ label, handleChange, value, options }) => (
  <div className="SearchFilter">
    {options.map(option => (
      <span
        className={
          value === option.value
            ? "SearchFilter-button SearchFilter-button--active"
            : "SearchFilter-button"
        }
        onClick={() => handleChange(option.value)}
        key={option.value}
      >
        {option.label}
      </span>
    ))}
  </div>
);

export default SearchFilter;

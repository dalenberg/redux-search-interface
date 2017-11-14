import React from "react";
import { connect } from "react-redux";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import SearchFilter from "../components/SearchFilter";
import SearchResults from "../components/SearchResults";
import Spinner from "../components/Spinner";
import Notification from "../components/Notification";

import { numberToLocale } from "../helpers";
import { sortOptions, orderOptions } from "../config";

import {
  updateQuery,
  updateSort,
  updateOrder,
  updatePage,
  searchResultsStatusSelector,
  searchResultsSelector,
  searchStateSelector
} from "../store/search";

const mapStateToProps = state => ({
  ...searchResultsSelector(state),
  ...searchResultsStatusSelector(state),
  ...searchStateSelector(state)
});

const Search = ({
  value,
  sort,
  order,
  page,
  updateQuery,
  updateSort,
  updateOrder,
  updatePage,
  results,
  total,
  nothingFound,
  isFetching,
  error
}) => (
  <div className="Search">
    <SearchBox
      placeholder="Search GitHub repositories"
      handleChange={updateQuery}
      value={value}
    />

    <div className="SearchInfo">
      <div className="SearchResults-count">{numberToLocale(total)} results</div>

      <div className="SearchFilters">
        <SearchFilter
          label="Sort"
          handleChange={updateSort}
          value={sort}
          options={sortOptions}
        />
        <SearchFilter
          label="Order"
          handleChange={updateOrder}
          value={order}
          options={orderOptions}
        />
      </div>
    </div>

    <Spinner isSpinning={isFetching} />
    <Notification
      type="notice"
      show={nothingFound && !isFetching && !error}
      title="No results found"
      message="Try another searchquery"
    />
    <Notification
      type="error"
      show={error && !isFetching}
      title="Oops! Something went wrong"
      message={error}
    />
    <Notification
      type="notice"
      show={!error && !isFetching && !nothingFound && total === 0}
      title="Hi there!"
      message="Start typing to find a GitHub repo"
    />
    <SearchResults
      show={!isFetching && !error}
      total={total}
      results={results}
    />
    <Pagination
      total={total}
      currentPage={page}
      handleChange={updatePage}
      itemsPerPage={30}
      show={total >= 30 && !isFetching && !error}
    />
  </div>
);

export default connect(mapStateToProps, {
  updateQuery,
  updateSort,
  updateOrder,
  updatePage
})(Search);

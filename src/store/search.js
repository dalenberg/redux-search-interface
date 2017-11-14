import { combineEpics } from "redux-observable";
import { createAction, handleActions } from "redux-actions";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";

import {
  dataRequest,
  repositoryByIdSelector,
  SEARCH_DATA_SUCCESS
} from "./data";

export const SEARCH_UPDATE_QUERY = "SEARCH_UPDATE_QUERY";
export const SEARCH_UPDATE_SORT = "SEARCH_UPDATE_SORT";
export const SEARCH_UPDATE_ORDER = "SEARCH_UPDATE_ORDER";
export const SEARCH_UPDATE_PAGE = "SEARCH_UPDATE_PAGE";

// Actions
export const updateQuery = createAction(SEARCH_UPDATE_QUERY);
export const updateSort = createAction(SEARCH_UPDATE_SORT);
export const updateOrder = createAction(SEARCH_UPDATE_ORDER);
export const updatePage = createAction(SEARCH_UPDATE_PAGE);

// Selectors
export const paramsSelector = state => ({
  query: state.search.query,
  sort: state.search.sort,
  order: state.search.order,
  page: state.search.page
});

export const querySelector = state => state.search.query;

export const searchResultsSelector = state => ({
  results: state.search.results.map(repositoryByIdSelector(state))
});

export const searchResultsStatusSelector = state => ({
  error: state.data.error,
  isFetching: state.data.isFetching
});

export const searchStateSelector = state => ({
  value: state.search.value,
  sort: state.search.sort,
  order: state.search.order,
  total: state.search.total,
  page: state.search.page,
  nothingFound: state.search.nothingFound
});

// Helpers
const dispatchRequest = store => action =>
  dataRequest(paramsSelector(store.getState()));

const filterShortQuery = store => action =>
  querySelector(store.getState()).length > 2;

// Initial state
export const initialState = {
  query: "",
  sort: "",
  order: "desc",
  total: 0,
  page: 1,
  results: [],
  nothingFound: false
};

// Reducer
const reducer = handleActions(
  {
    [SEARCH_UPDATE_QUERY]: (state, { payload }) => ({
      ...state,
      page: 1,
      query: payload
    }),
    [SEARCH_UPDATE_ORDER]: (state, { payload }) => ({
      ...state,
      page: 1,
      order: payload
    }),
    [SEARCH_UPDATE_SORT]: (state, { payload }) => ({
      ...state,
      page: 1,
      sort: payload
    }),
    [SEARCH_UPDATE_PAGE]: (state, { payload }) => ({
      ...state,
      page: Number(payload)
    }),
    [SEARCH_DATA_SUCCESS]: (state, { payload }) => ({
      ...state,
      total: payload.total_count,
      results: payload.items.map(item => item.id),
      nothingFound: payload.total_count === 0
    })
  },
  initialState
);

// Epics
export const searchEpic = (action$, store) =>
  action$
    .ofType(
      SEARCH_UPDATE_QUERY,
      SEARCH_UPDATE_SORT,
      SEARCH_UPDATE_ORDER,
      SEARCH_UPDATE_PAGE
    )
    .filter(filterShortQuery(store))
    .map(dispatchRequest(store));

export default {
  epics: combineEpics(searchEpic),
  reducer
};

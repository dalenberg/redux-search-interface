import { combineEpics } from "redux-observable";
import { createAction, handleActions } from "redux-actions";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import { toKeyedObject } from "../helpers";

export const SEARCH_DATA_REQUEST = "SEARCH_DATA_REQUEST";
export const SEARCH_DATA_SUCCESS = "SEARCH_DATA_SUCCESS";
export const SEARCH_DATA_ERROR = "SEARCH_DATA_ERROR";

// Actions
export const dataRequest = createAction(SEARCH_DATA_REQUEST);
export const dataSuccess = createAction(SEARCH_DATA_SUCCESS);
export const dataError = createAction(SEARCH_DATA_ERROR, payload => ({
  message: payload.message
}));

// Selectors
export const repositoryByIdSelector = state => id =>
  state.data.repositories[id];
export const dataErrorSelector = state => state.data.error;
export const isDataFetchingSelector = state => state.data.isFetching;

// Initial state
const initialState = {
  repositories: {},
  error: false,
  isFetching: false
};

// Reducer
const reducer = handleActions(
  {
    [SEARCH_DATA_REQUEST]: (state, { payload }) => ({
      ...state,
      isFetching: true,
      error: false
    }),
    [SEARCH_DATA_SUCCESS]: (state, { payload }) => ({
      ...state,
      repositories: {
        ...state.repositories,
        ...toKeyedObject(payload.items)
      },
      isFetching: false
    }),
    [SEARCH_DATA_ERROR]: (state, { payload }) => ({
      ...state,
      error: payload.message,
      isFetching: false
    })
  },
  initialState
);

// Epics
const dataEpic = (action$, store, { api }) =>
  action$
    .ofType(SEARCH_DATA_REQUEST)
    .debounceTime(500)
    .switchMap(({ payload }) =>
      api
        .searchRepos(payload)
        .then(dataSuccess)
        .catch(dataError)
    );

export default {
  epics: combineEpics(dataEpic),
  reducer
};

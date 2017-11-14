import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import search from "./search";
import data from "./data";

const epics = combineEpics(search.epics, data.epics);

const reducers = combineReducers({
  search: search.reducer,
  data: data.reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (dependencies, initialState = {}) => {
  const epicMiddleware = createEpicMiddleware(epics, {
    dependencies
  });

  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
};

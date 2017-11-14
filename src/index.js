import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Search from "./views/Search";
import Api from "./api/api";
import createStore from "./store";
import "./index.css";

const api = new Api({
  baseUrl: "https://api.github.com",
  dependencies: {
    request: window.fetch.bind(window)
  }
});

const store = createStore({ api });

render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById("root")
);

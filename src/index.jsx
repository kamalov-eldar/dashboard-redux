import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/normalize.css";
import "./style/style.css";
import { App } from "./App";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
/*
ReactDOM.render(
    <App />
  document.getElementById("root")
); */

ReactDOM.render(
  <Provider store={store}>
    {/* провайдер передает библ store   */}
    <App
    /*  state={state}
        dispatch={store.dispatch.bind(store)}
        store={store} */
    />
  </Provider>,
  document.getElementById("root")
);

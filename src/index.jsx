import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/normalize.css";
import { App } from "./App";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { Provider } from "react-redux";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);

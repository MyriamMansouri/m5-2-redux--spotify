import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store";
import { Provider } from "react-redux";
import App from "./components/App";
import GlobalStyle from "./components/App/GlobalStyle";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle/>
    <App />
  </Provider>,
  document.getElementById("root")
);

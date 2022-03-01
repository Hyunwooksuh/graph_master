import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import App from "./componenets/App/App";
import GlobalStyle from "./style/GlobalStyle";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);

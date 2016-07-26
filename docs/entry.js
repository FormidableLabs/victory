import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";

import App from "./app";
import Docs from "./victory-pie/docs";

const content = document.getElementById("content");
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="pie" component={Docs} />
    </Route>
  </Router>
), content);

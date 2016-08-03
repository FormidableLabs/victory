import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

import App from "./app";
import Docs from "./victory-pie/docs";

const content = document.getElementById("content");
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="pie" component={Docs} />
    </Route>
  </Router>
), content);

import { createHistory, useBasename } from "history"
import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import App from "./components/app";
import Docs from "./components/docs";
import Root from "./components/root";

// Analytics
import ga from "react-ga";

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={App} />
    <Route path="docs" component={Docs} />
  </Route>
);

export default {

  routes,

  run: (el) => {
    const history = useBasename(createHistory)({
      basename: "/victory"
    });
    const router = (
      <Router history={history}>
        {routes}
      </Router>
    );
    ga.initialize("UA-43290258-1");
    render(router, el);
  }

};

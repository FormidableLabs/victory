/*globals window:false */

import { createHistory, useBasename } from "history";
import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import App from "./components/app";
import ComponentDocs from "./components/component-docs";
import Docs from "./components/docs";
import Root from "./components/root";
import { routing as routingConfig } from "./config";

// Analytics
import ga from "react-ga";

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={App} />
    <Route path="docs" component={Docs} />
    <Route path="docs/:component" component={ComponentDocs} />
  </Route>
);

export default {

  routes,

  run: (el) => {
    const history = useBasename(createHistory)({
      basename: routingConfig.base
    });
    const router = (
      <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        {routes}
      </Router>
    );
    ga.initialize("UA-43290258-1");
    render(router, el);
  }

};

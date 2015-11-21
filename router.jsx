import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Docs from './components/docs';
import Root from './components/root';

// Analytics
import ga from 'react-ga';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={App} />
    <Route path="docs" component={Docs} />
  </Route>
);

export default {

  routes,

  run: (el) => {
    const router = (
      <Router history={createBrowserHistory()}>
        {routes}
      </Router>
    );
    ga.initialize("UA-43290258-1", { debug: true });
    render(router, el);
  }

}

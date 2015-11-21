import createBrowserHistory from 'history/lib/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import Root from './components/root';
import Docs from './components/docs';

const routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Root}>
      <Route path="docs" component={Docs} />
    </Route>
  </Router>
);

export default {

  routes,

  run: (el) => {
    render(routes, el);
  }

}

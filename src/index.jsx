import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'

import Scatter from './components/scatter';

require('../demo/styles/syntax.css');
require('../demo/styles/codemirror.css');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Cool Beans!</h1>
        {this.props.children}
      </div>
    )
  }
}

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Scatter}/>
    </Route>
  </Router>
), document.getElementById("content"));

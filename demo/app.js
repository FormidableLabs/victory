/*global document:false */
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import AnimationDemo from "./victory-animation-demo";
import LabelDemo from "./victory-label-demo";
import LegendDemo from "./victory-legend-demo";
import TooltipDemo from "./victory-tooltip-demo";
import { Router, Route, Link, hashHistory } from "react-router";

const content = document.getElementById("content");

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/animation">Victory Animation Demo</Link></li>
          <li><Link to="/label">Victory Label Demo</Link></li>
          <li><Link to="/legend">Victory Legend</Link></li>
          <li><Link to="/tooltip">Victory Tooltip Demo</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="animation" component={AnimationDemo}/>
      <Route path="label" component={LabelDemo}/>
      <Route path="legend" component={LegendDemo}/>
      <Route path="tooltip" component={TooltipDemo}/>
    </Route>
  </Router>
), content);

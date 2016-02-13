/*global document:false */
import React from "react";
import ReactDOM from "react-dom";
import AxisDemo from "./components/victory-axis-demo";
import BarDemo from "./components/victory-bar-demo";
import ChartDemo from "./components/victory-chart-demo";
import LineDemo from "./components/victory-line-demo";
import ScatterDemo from "./components/victory-scatter-demo";
import { Router, Route, Link } from "react-router";

const content = document.getElementById("content");

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/axis">Victory Axis Demo</Link></li>
          <li><Link to="/bar">Victory Bar Demo</Link></li>
          <li><Link to="/chart">Victory Chart Demo</Link></li>
          <li><Link to="/line">Victory Line Demo</Link></li>
          <li><Link to="/scatter">Victory Scatter Demo</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="axis" component={AxisDemo}/>
      <Route path="bar" component={BarDemo}/>
      <Route path="chart" component={ChartDemo}/>
      <Route path="line" component={LineDemo}/>
      <Route path="scatter" component={ScatterDemo}/>
    </Route>
  </Router>
), content);

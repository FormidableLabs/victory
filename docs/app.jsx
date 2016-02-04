import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link } from "react-router";
import AxisDocs from "./victory-axis/docs";
import BarDocs from "./victory-bar/docs";
import ChartDocs from "./victory-chart/docs";
import LineDocs from "./victory-line/docs";
import ScatterDocs from "./victory-scatter/docs";

const content = document.getElementById("content");

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/axis">Victory Axis Docs</Link></li>
          <li><Link to="/bar">Victory Bar Docs</Link></li>
          <li><Link to="/chart">Victory Chart Docs</Link></li>
          <li><Link to="/line">Victory Line Docs</Link></li>
          <li><Link to="/scatter">Victory Scatter Docs</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="axis" component={AxisDocs}/>
      <Route path="bar" component={BarDocs}/>
      <Route path="chart" component={ChartDocs}/>
      <Route path="line" component={LineDocs}/>
      <Route path="scatter" component={ScatterDocs}/>
    </Route>
  </Router>
), content);

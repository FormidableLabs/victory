import React from "react";
import { Link } from "react-router";
import { StyleRoot } from "radium";

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <StyleRoot>
        <ul>
          <li><Link to="/area">Victory Area Docs</Link></li>
          <li><Link to="/axis">Victory Axis Docs</Link></li>
          <li><Link to="/bar">Victory Bar Docs</Link></li>
          <li><Link to="/chart">Victory Chart Docs</Link></li>
          <li><Link to="/line">Victory Line Docs</Link></li>
          <li><Link to="/scatter">Victory Scatter Docs</Link></li>
        </ul>
        {this.props.children}
      </StyleRoot>
    );
  }
});

export default App;

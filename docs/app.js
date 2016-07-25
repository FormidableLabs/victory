import React from "react";
import { Link } from "react-router";
import { Style, StyleRoot } from "radium";
import { VictoryTheme } from "formidable-landers";

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <StyleRoot>
        <ul>
          <li><Link to="/animation">Victory Animation Docs</Link></li>
          <li><Link to="/label">Victory Label Docs</Link></li>
        </ul>
        {this.props.children}
        <Style rules={VictoryTheme}/>
      </StyleRoot>
    );
  }
});

App.propTypes = {
  children: React.PropTypes.element
};

export default App;

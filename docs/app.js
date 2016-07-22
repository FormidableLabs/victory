import React from "react";
import { Link } from "react-router";
import { StyleRoot, Style } from "radium";
import { VictoryTheme } from "formidable-landers";


const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element
  },

  render() {
    return (
      <StyleRoot>
        <ul>
          <li><Link to="/pie">Victory Pie Docs</Link></li>
        </ul>
        {this.props.children}
        <Style rules={VictoryTheme} />
      </StyleRoot>
    );
  }
});

export default App;

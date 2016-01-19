import React from "react";
import { StyleRoot } from "radium";

class Root extends React.Component {
  render() {
    return (
      <StyleRoot>
        {this.props.children}
      </StyleRoot>
    );
  }
}

Root.propTypes = {
  children: React.PropTypes.element
};

export default Root;

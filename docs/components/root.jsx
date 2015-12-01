import React from "react";

class Root extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Root.propTypes = {
  children: React.PropTypes.element
};

export default Root;

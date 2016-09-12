import React, { PropTypes } from "react";

export default class Slice extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object,
    datum: PropTypes.object,
    events: PropTypes.object
  };

  renderSlice(props) {
    return (
      <path
        d={props.pathFunction(props.slice)}
        style={props.style}
        {...props.events}
      />
    );
  }

  render() {
    return this.renderSlice(this.props);
  }
}

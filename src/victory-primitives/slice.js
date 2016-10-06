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

  renderSlice(path, style, events) {
    return <path d={path} style={style} {...events}/>;
  }

  render() {
    const path = this.props.pathFunction(this.props.slice);
    const { style, events } = this.props;
    return this.renderSlice(path, style, events);
  }
}

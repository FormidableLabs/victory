import React, { PropTypes } from "react";

export default class Slice extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object,
    datum: PropTypes.object,
    data: PropTypes.array,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string
  };

  // Overridden in victory-core-native
  renderSlice(path, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <path
        d={path}
        className={className}
        role={role || "presentation"}
        style={style}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }

  render() {
    const path = this.props.pathFunction(this.props.slice);
    const { style, events } = this.props;
    return this.renderSlice(path, style, events);
  }
}

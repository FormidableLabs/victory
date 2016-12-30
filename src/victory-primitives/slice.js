import React, { PropTypes } from "react";
import Helpers from "../victory-util/helpers";

export default class Slice extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
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
    const { style, events, datum, active, slice } = this.props;
    const path = this.props.pathFunction(slice);
    const evaluatedStyle = Helpers.evaluateStyle(style, datum, active);
    return this.renderSlice(path, evaluatedStyle, events);
  }
}

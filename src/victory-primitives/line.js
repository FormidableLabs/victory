import React, { PropTypes } from "react";
import { assign } from "lodash";

export default class Line extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    datum: PropTypes.any,
    data: PropTypes.array,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
    style: PropTypes.object,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string
  };

  // Overridden in victory-core-native
  renderAxisLine(props, style, events) {
    const { role, shapeRendering, className } = this.props;
    return (
      <line
        {...props}
        className={className}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        vectorEffect="non-scaling-stroke"
        {...events}
      />
    );
  }

  render() {
    const { x1, x2, y1, y2, events} = this.props;
    const style = assign({stroke: "black"}, this.props.style);
    return this.renderAxisLine({x1, x2, y1, y2}, style, events);
  }
}

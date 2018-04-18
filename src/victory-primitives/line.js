import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Line extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipPath: PropTypes.string,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    return !Collection.areVictoryPropsEqual(this.props, nextProps);
  }

  render() {
    const {
      x1, x2, y1, y2, events, className, clipPath, transform, style, shapeRendering, role
    } = this.props;
    return (
      <line
        x1={x1} x2={x2} y1={y1} y2={y2}
        className={className}
        clipPath={clipPath}
        transform={transform}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        vectorEffect="non-scaling-stroke"
        {...events}
      />
    );
  }
}

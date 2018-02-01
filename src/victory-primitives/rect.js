import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Rect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    events: PropTypes.object,
    height: PropTypes.number,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    const { className, x, y, width, height, transform, style } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [width, nextProps.width],
      [height, nextProps.height],
      [transform, nextProps.transform],
      [style, nextProps.style]
    ])) {
      return true;
    }
    return false;
  }

  // Overridden in victory-core-native
  render() {
    const { x, y, width, height, events, className, style, role, shapeRendering } = this.props;
    return (
      <rect
        x={x} y={y} width={width} height={height}
        className={className}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        vectorEffect="non-scaling-stroke"
        {...events}
      />
    );
  }
}

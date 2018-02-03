import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Line extends React.Component {
  static propTypes = {
    className: PropTypes.string,
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
    const { className, x1, x2, y1, y2, style } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [x1, nextProps.x1],
      [x2, nextProps.x2],
      [y1, nextProps.y1],
      [y2, nextProps.y2],
      [style, nextProps.style]
    ])) {
      return true;
    }
    return false;
  }


  // shouldComponentUpdate(nextProps) {
  //   const { className, x1, x2, y1, y2, style, transform } = this.props;
  //   if (!Collection.allSetsEqual([
  //     [className, nextProps.className],
  //     [x1, nextProps.x1],
  //     [x2, nextProps.x2],
  //     [y1, nextProps.y1],
  //     [y2, nextProps.y2],
  //     [transform, nextProps.transform],
  //     [style, nextProps.style]
  //   ])) {
  //     return true;
  //   }
  //   return false;
  // }

  // Overridden in victory-core-native
  render() {
    const { x1, x2, y1, y2, events, className, style, shapeRendering, role } = this.props;
    return (
      <line
        x1={x1} x2={x2} y1={y1} y2={y2}
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

import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Circle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipPath: PropTypes.string,
    cx: PropTypes.number,
    cy: PropTypes.number,
    events: PropTypes.object,
    r: PropTypes.number,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return !Collection.areVictoryPropsEqual(this.props, nextProps);
  }

  render() {
    const {
      cx, cy, r, events, className, style, role, shapeRendering, transform, clipPath
     } = this.props;
    return (
      <circle
        cx={cx} cy={cy} r={r}
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

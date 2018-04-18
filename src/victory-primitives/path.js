import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class Path extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clipPath: PropTypes.string,
    d: PropTypes.string,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return !Collection.areVictoryPropsEqual(this.props, nextProps);
  }

  render() {
    const { d, role, shapeRendering, className, clipPath, style, transform, events } = this.props;
    return (
      <path
        d={d}
        transform={transform}
        className={className}
        clipPath={clipPath}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }
}

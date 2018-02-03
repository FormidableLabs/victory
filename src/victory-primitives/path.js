import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class VPath extends React.Component {
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
    const { className, clipPath, d, style, transform } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
      [clipPath, nextProps.clipPath],
      [d, nextProps.d],
      [transform, nextProps.transform],
      [style, nextProps.style]
    ])) {
      return true;
    }
    return false;
  }

  // Overridden in victory-core-native
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

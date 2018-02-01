import React from "react";
import PropTypes from "prop-types";
import Collection from "../victory-util/collection";

export default class VPath extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    d: PropTypes.string,
    events: PropTypes.object,
    role: PropTypes.string,
    shapeRendering: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    const { className, d, style, transform } = this.props;
    if (!Collection.allSetsEqual([
      [className, nextProps.className],
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
    const { d, role, shapeRendering, className, style, transform, events } = this.props;
    console.log(events)
    return (
      <path
        d={d}
        transform={transform}
        className={className}
        style={style}
        role={role || "presentation"}
        shapeRendering={shapeRendering || "auto"}
        {...events}
      />
    );
  }
}

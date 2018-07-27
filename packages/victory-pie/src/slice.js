import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps, Path } from "victory-core";
import { isFunction } from "lodash";

export default class Slice extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    datum: PropTypes.object,
    pathComponent: PropTypes.element,
    pathFunction: PropTypes.func,
    slice: PropTypes.object
  };

  static defaultProps = {
    pathComponent: <Path/>
  };

  render() {
    const {
      datum, slice, active, role, shapeRendering, className,
      origin, events, pathComponent, pathFunction, style, clipPath
    } = this.props;
    const defaultTransform = origin ? `translate(${origin.x}, ${origin.y})` : undefined;
    const transform = this.props.transform || defaultTransform;
    return React.cloneElement(pathComponent, {
      className, role, shapeRendering, events, transform, clipPath,
      style: Helpers.evaluateStyle(style, datum, active),
      d: isFunction(pathFunction) ? pathFunction(slice) : undefined
    });
  }
}

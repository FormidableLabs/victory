import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import CommonProps from "./common-props";
import Path from "./path";
import { isFunction } from "lodash";

export default class Slice extends React.Component {
  static propTypes = {
    ...CommonProps,
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
      origin, events, pathComponent, pathFunction, style
    } = this.props;
    return React.cloneElement(pathComponent, {
      className, role, shapeRendering, events,
      transform: origin ? `translate(${origin.x}, ${origin.y})` : undefined,
      style: Helpers.evaluateStyle(style, datum, active),
      d: isFunction(pathFunction) ? pathFunction(slice) : undefined
    });
  }
}

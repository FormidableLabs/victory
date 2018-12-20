import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";

export default class Border extends React.Component {
  static propTypes = {
    ...CommonProps.primitiveProps,
    height: PropTypes.number,
    rectComponent: PropTypes.element,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static defaultProps = {
    rectComponent: <Rect />
  };

  render() {
    const {
      x,
      y,
      width,
      height,
      events,
      datum,
      active,
      role,
      clipPath,
      className,
      shapeRendering,
      rectComponent,
      transform
    } = this.props;
    const style = Helpers.evaluateStyle(assign({ fill: "none" }, this.props.style), datum, active);
    return React.cloneElement(rectComponent, {
      style,
      className,
      x,
      y,
      width,
      height,
      events,
      role,
      shapeRendering,
      transform,
      clipPath
    });
  }
}

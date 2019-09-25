import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";

const Border = (props) =>
  React.cloneElement(props.rectComponent, {
    ...props.events,
    style: Helpers.evaluateStyle(assign({ fill: "none" }, props.style), props),
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    transform: props.transform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    clipPath: props.clipPath
  });

Border.propTypes = {
  ...CommonProps.primitiveProps,
  height: PropTypes.number,
  rectComponent: PropTypes.element,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

Border.defaultProps = {
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Border;

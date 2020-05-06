import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";

const Background = (props) =>
  React.cloneElement(props.rectComponent, {
    ...props.events,
    style: props.style && props.style.background,
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    transform: props.transform,
    className: props.className,
    role: props.role,
    shapeRendering: props.shapeRendering,
    x: props.range.x[0],
    y: props.range.y[1],
    width: props.range.x[1] - props.range.x[0],
    height: props.range.y[0] - props.range.y[1],
    clipPath: props.clipPath
  });

Background.propTypes = {
  ...CommonProps.primitiveProps,
  height: PropTypes.number,
  rectComponent: PropTypes.element,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

Background.defaultProps = {
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Background;

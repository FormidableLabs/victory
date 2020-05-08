import React from "react";
import PropTypes from "prop-types";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";
import Circle from "./circle";

const Background = (props) => {
  return props.polar
    ? React.cloneElement(props.circleComponent, {
        ...props.events,
        style: props.style,
        role: props.role,
        shapeRendering: props.shapeRendering,
        cx: props.x,
        cy: props.y,
        r: props.height
      })
    : React.cloneElement(props.rectComponent, {
        ...props.events,
        style: props.style,
        role: props.role,
        shapeRendering: props.shapeRendering,
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height
      });
};

Background.propTypes = {
  ...CommonProps.primitiveProps,
  circleComponent: PropTypes.element,
  rectComponent: PropTypes.element
};

Background.defaultProps = {
  circleComponent: <Circle />,
  rectComponent: <Rect />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Background;

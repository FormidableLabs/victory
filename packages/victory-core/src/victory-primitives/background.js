import React from "react";
import PropTypes from "prop-types";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";
import Circle from "./circle";

const getRangeBounds = (props) => ({ x: props.range.x[0], y: props.range.y[1] });
const getHeight = (props) => (props.polar ? props.range.y[1] : props.range.y[0] - props.range.y[1]);
const getWidth = (props) => props.range.x[1] - props.range.x[0];

const Background = (props) => {
  return props.polar
    ? React.cloneElement(props.circleComponent, {
        ...props.events,
        style: props.style && props.style.background,
        role: props.role,
        shapeRendering: props.shapeRendering,
        cx: "50%",
        cy: "50%",
        r: getHeight(props)
      })
    : React.cloneElement(props.rectComponent, {
        ...props.events,
        style: props.style && props.style.background,
        role: props.role,
        shapeRendering: props.shapeRendering,
        x: getRangeBounds(props).x,
        y: getRangeBounds(props).y,
        width: getWidth(props),
        height: getHeight(props)
      });
};

Background.propTypes = {
  ...CommonProps.baseProps,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.string),
      y: PropTypes.arrayOf(PropTypes.string)
    })
  ]),
  circleComponent: PropTypes.element,
  domain: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  horizontal: PropTypes.bool,
  rectComponent: PropTypes.element,
  role: PropTypes.string,
  shapeRendering: PropTypes.string,
  stringMap: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.string),
    y: PropTypes.arrayOf(PropTypes.string)
  }),
  style: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number
};

Background.defaultProps = {
  rectComponent: <Rect />,
  circleComponent: <Circle />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Background;

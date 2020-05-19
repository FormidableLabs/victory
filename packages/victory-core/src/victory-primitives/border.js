import React from "react";
import PropTypes from "prop-types";
import Helpers from "../victory-util/helpers";
import { assign } from "lodash";
import CommonProps from "../victory-util/common-props";
import Rect from "./rect";

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `desc`
   * `id`
   * `style`
   * `tabIndex`
   */
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const style = Helpers.evaluateStyle(assign({ fill: "none" }, props.style), props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, { desc, id, style, tabIndex });
};

const Border = (props) => {
  props = evaluateProps(props);

  return React.cloneElement(props.rectComponent, {
    ...props.events,
    style: props.style,
    desc: props.desc,
    tabIndex: props.tabIndex,
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
};

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

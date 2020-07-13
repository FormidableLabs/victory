import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import Helpers from "../victory-util/helpers";
import pathHelpers from "./path-helpers";
import CommonProps from "../victory-util/common-props";
import Path from "./path";

const getPath = (props) => {
  const { x, y, size, symbol } = props;
  if (props.getPath) {
    return props.getPath(x, y, size);
  }
  const pathFunctions = {
    circle: pathHelpers.circle,
    square: pathHelpers.square,
    diamond: pathHelpers.diamond,
    triangleDown: pathHelpers.triangleDown,
    triangleUp: pathHelpers.triangleUp,
    plus: pathHelpers.plus,
    minus: pathHelpers.minus,
    star: pathHelpers.star
  };
  const symbolFunction =
    typeof pathFunctions[symbol] === "function" ? pathFunctions[symbol] : pathFunctions.circle;
  return symbolFunction(x, y, size);
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `desc`
   * `id`
   * `size`
   * `style`
   * `symbol`
   * `tabIndex`
   * `ariaLabel`
   * `ariaDescribedBy`
   */
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);
  const symbol = Helpers.evaluateProp(props.symbol, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const ariaDescribedBy = Helpers.evaluateProp(props.ariaDescribedBy, props);

  return assign({}, props, { desc, id, size, style, symbol, tabIndex, ariaLabel, ariaDescribedBy });
};

const Point = (props) => {
  props = evaluateProps(props);

  return React.cloneElement(props.pathComponent, {
    ...props.events,
    d: getPath(props),
    style: props.style,
    desc: props.desc,
    tabIndex: props.tabIndex,
    role: props.role,
    shapeRendering: props.shapeRendering,
    className: props.className,
    transform: props.transform,
    clipPath: props.clipPath,
    "aria-label": props.ariaLabel,
    "aria-describedby": props.ariaDescribedBy
  });
};

Point.propTypes = {
  ...CommonProps.primitiveProps,
  datum: PropTypes.object,
  getPath: PropTypes.func,
  pathComponent: PropTypes.element,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  symbol: PropTypes.oneOfType([
    PropTypes.oneOf([
      "circle",
      "diamond",
      "plus",
      "minus",
      "square",
      "star",
      "triangleDown",
      "triangleUp"
    ]),
    PropTypes.func
  ]),
  x: PropTypes.number,
  y: PropTypes.number
};

Point.defaultProps = {
  pathComponent: <Path />,
  role: "presentation",
  shapeRendering: "auto"
};

export default Point;

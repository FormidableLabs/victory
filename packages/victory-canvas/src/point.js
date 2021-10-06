import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import { Helpers, CommonProps, PointPathHelpers } from "victory-core";
import { useCanvasContext } from "./hooks/use-canvas-context";

const getPath = (props) => {
  const { x, y, size, symbol } = props;
  if (props.getPath) {
    return props.getPath(x, y, size);
  }
  const pathFunctions = {
    circle: PointPathHelpers.circle,
    square: PointPathHelpers.square,
    diamond: PointPathHelpers.diamond,
    triangleDown: PointPathHelpers.triangleDown,
    triangleUp: PointPathHelpers.triangleUp,
    plus: PointPathHelpers.plus,
    minus: PointPathHelpers.minus,
    star: PointPathHelpers.star,
    cross: PointPathHelpers.cross
  };
  const symbolFunction =
    typeof pathFunctions[symbol] === "function"
      ? pathFunctions[symbol]
      : pathFunctions.circle;
  return symbolFunction(x, y, size);
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props are:
   * `ariaLabel`
   * `desc`
   * `id`
   * `size`
   * `style`
   * `symbol`
   * `tabIndex`
   */
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);
  const symbol = Helpers.evaluateProp(props.symbol, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, {
    ariaLabel,
    desc,
    id,
    size,
    style,
    symbol,
    tabIndex
  });
};

const Point = (initialProps) => {
  const { canvasRef } = useCanvasContext();
  const props = evaluateProps(initialProps);

  const draw = React.useCallback(
    (ctx) => {
      const { style } = props;
      const path = getPath(props);
      ctx.fillStyle = style.fill;
      // eslint-disable-next-line no-undef
      const path2d = new Path2D(path);
      ctx.fill(path2d);
    },
    [props]
  );

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    draw(ctx);
  }, []);

  return null;
};

Point.propTypes = {
  ...CommonProps.primitiveProps,
  datum: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  x: PropTypes.number,
  y: PropTypes.number
};

Point.defaultProps = {
  role: "presentation",
  shapeRendering: "auto"
};

export default Point;

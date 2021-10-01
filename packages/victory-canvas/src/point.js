import React from "react";
import PropTypes from "prop-types";
import { assign } from "lodash";
import { Helpers, CommonProps } from "victory-core";
import { useCanvasContext } from "./hooks/use-canvas-context";

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
  const { x, y, style, size } = props;

  const draw = React.useCallback(
    (ctx) => {
      ctx.fillStyle = style.fill;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    },
    [x, y, style, size]
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

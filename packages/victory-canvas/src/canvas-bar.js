import { assign } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  getBarPath,
  getBarWidth,
  getCornerRadius,
  getPolarBarPath,
  getStyle,
} from "victory-bar";
import { useCanvasContext } from "./hooks/use-canvas-context";
import { CommonProps } from "victory-core";

const evaluateProps = (props) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `barWidth`
   * 3) `cornerRadius`
   */
  const style = getStyle(props.style, props);
  const barWidth = getBarWidth(props.barWidth, assign({}, props, { style }));
  const cornerRadius = getCornerRadius(
    props.cornerRadius,
    assign({}, props, { style, barWidth }),
  );

  return assign({}, props, {
    style,
    barWidth,
    cornerRadius,
  });
};

export const usePreviousValue = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const CanvasBar = (initialProps) => {
  const { canvasRef } = useCanvasContext();
  const props = evaluateProps(initialProps);
  const { polar, style, barWidth, cornerRadius, origin } = props;

  const path2d = React.useMemo(() => {
    const p = polar
      ? getPolarBarPath(props, cornerRadius)
      : getBarPath(props, barWidth, cornerRadius);

    return new Path2D(p);
  }, [polar, barWidth, cornerRadius, props]);

  const previousPath = usePreviousValue(path2d);

  const draw = React.useCallback(
    (ctx, path) => {
      ctx.fillStyle = style.fill;
      ctx.strokeStyle = style.stroke;
      ctx.globalAlpha = style.fillOpacity;
      ctx.lineWidth = style.strokeWidth;

      if (polar) {
        ctx.translate(origin.x, origin.y);
      }
      ctx.fill(path);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    },
    [style, origin, polar],
  );

  // This will clear the previous bar without clearing the entire canvas
  const clearPreviousPath = React.useCallback(
    (ctx) => {
      if (previousPath) {
        ctx.save();
        // This ensures that the entire shape is erased
        ctx.lineWidth = style.strokeWidth + 2;

        ctx.globalCompositeOperation = "destination-out";
        draw(ctx, previousPath);
        ctx.stroke(previousPath);

        ctx.restore();
      }
    },
    [draw, previousPath, style],
  );

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    clearPreviousPath(ctx);
    draw(ctx, path2d);
  }, [
    canvasRef,
    draw,
    polar,
    barWidth,
    cornerRadius,
    props,
    path2d,
    clearPreviousPath,
  ]);

  return null;
};

CanvasBar.propTypes = {
  ...CommonProps.primitiveProps,
  alignment: PropTypes.oneOf(["start", "middle", "end"]),
  barRatio: PropTypes.number,
  barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  cornerRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
    PropTypes.shape({
      top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
      bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    }),
  ]),
  datum: PropTypes.object,
  getPath: PropTypes.func,
  horizontal: PropTypes.bool,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  y0: PropTypes.number,
};

export default CanvasBar;

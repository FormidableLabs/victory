/*global Path2D:false */
import { assign, isNil, isPlainObject } from "lodash";
import React from "react";
import {
  Bar as SVGBar,
  getCustomBarPath,
  getHorizontalBarPath,
  getVerticalBarPath,
  getVerticalPolarBarPath
} from "victory-bar";
import { Helpers } from "victory-core";
import { useCanvasContext } from "./hooks/use-canvas-context";

const getBarPath = (props, width, cornerRadius) => {
  if (props.getPath) {
    return getCustomBarPath(props, width);
  }

  return props.horizontal
    ? getHorizontalBarPath(props, width, cornerRadius)
    : getVerticalBarPath(props, width, cornerRadius);
};

const getPolarBarPath = (props, cornerRadius) => {
  return getVerticalPolarBarPath(props, cornerRadius);
};

const getBarWidth = (barWidth, props) => {
  const { scale, data, defaultBarWidth, style } = props;
  if (barWidth) {
    return Helpers.evaluateProp(barWidth, props);
  } else if (style.width) {
    return style.width;
  }
  const range = scale.x.range();
  const extent = Math.abs(range[1] - range[0]);
  const bars = data.length + 2;
  const barRatio = props.barRatio || 0.5;
  const defaultWidth =
    barRatio * (data.length < 2 ? defaultBarWidth : extent / bars);
  return Math.max(1, defaultWidth);
};

const getCornerRadiusFromObject = (cornerRadius, props) => {
  const realCornerRadius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0
  };
  const updateCornerRadius = (corner, fallback) => {
    if (!isNil(cornerRadius[corner])) {
      realCornerRadius[corner] = Helpers.evaluateProp(
        cornerRadius[corner],
        props
      );
    } else if (!isNil(cornerRadius[fallback])) {
      realCornerRadius[corner] = Helpers.evaluateProp(
        cornerRadius[fallback],
        props
      );
    }
  };
  updateCornerRadius("topLeft", "top");
  updateCornerRadius("topRight", "top");
  updateCornerRadius("bottomLeft", "bottom");
  updateCornerRadius("bottomRight", "bottom");
  return realCornerRadius;
};

const getCornerRadius = (cornerRadius, props) => {
  const realCornerRadius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0
  };
  if (!cornerRadius) {
    return realCornerRadius;
  }
  if (isPlainObject(cornerRadius)) {
    return getCornerRadiusFromObject(cornerRadius, props);
  } else {
    realCornerRadius.topLeft = Helpers.evaluateProp(cornerRadius, props);
    realCornerRadius.topRight = Helpers.evaluateProp(cornerRadius, props);
    return realCornerRadius;
  }
};

const getStyle = (style = {}, props) => {
  if (props.disableInlineStyles) {
    return {};
  }
  const stroke = style.fill || "black";
  const baseStyle = { fill: "black", stroke };
  return Helpers.evaluateStyle(assign(baseStyle, style), props);
};

const evaluateProps = (props) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `barWidth`
   * 3) `cornerRadius`
   *
   * Everything else does not have to be evaluated in a particular order:
   * `ariaLabel`
   * `desc`
   * `id`
   * `tabIndex`
   */
  const style = getStyle(props.style, props);
  const barWidth = getBarWidth(props.barWidth, assign({}, props, { style }));
  const cornerRadius = getCornerRadius(
    props.cornerRadius,
    assign({}, props, { style, barWidth })
  );

  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const desc = Helpers.evaluateProp(props.desc, props);
  const id = Helpers.evaluateProp(props.id, props);
  const tabIndex = Helpers.evaluateProp(props.tabIndex, props);

  return assign({}, props, {
    ariaLabel,
    style,
    barWidth,
    cornerRadius,
    desc,
    id,
    tabIndex
  });
};

export const usePreviousValue = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Bar = (initialProps) => {
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
    [style, origin, polar]
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
    [draw, previousPath, style]
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
    clearPreviousPath
  ]);

  return null;
};

Bar.propTypes = SVGBar.propTypes;

export default Bar;

import React from "react";
import PropTypes from "prop-types";
import { Helpers, CommonProps } from "victory-core";
import { assign, isPlainObject, isNil } from "lodash";
import { useCanvasContext } from "./hooks/use-canvas-context";

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

const Bar = (initialProps) => {
  const { canvasRef } = useCanvasContext();
  const props = evaluateProps(initialProps);
  const {
    style,
    barWidth,
    horizontal,
    cornerRadius,
    x,
    x0,
    y,
    y0,
    alignment = "middle"
  } = props;

  const position = React.useMemo(() => {
    const size = alignment === "middle" ? barWidth / 2 : barWidth;
    const sign = horizontal ? -1 : 1;
    if (horizontal) {
      return {
        x0,
        x1: x,
        y0: alignment === "start" ? y : y - sign * size,
        y1: alignment === "end" ? y : y + sign * size
      };
    }

    return {
      x0: alignment === "start" ? x : x - sign * size,
      x1: alignment === "end" ? x : x + sign * size,
      y0,
      y1: y
    };
  }, [x, x0, y, y0, alignment, barWidth, horizontal]);

  const barPosition = React.useMemo(() => {
    if (horizontal) {
      const isPositive = position.x1 - position.x0 > 0;
      return {
        x: isPositive ? position.x0 : position.x1,
        y: position.y0 - barWidth,
        height: barWidth,
        width: Math.abs(position.x1 - position.x0)
      };
    }
    const isPositive = position.y0 - position.y1 > 0;
    return {
      x: position.x1 - barWidth,
      y: isPositive ? position.y1 : position.y0,
      height: Math.abs(position.y0 - position.y1),
      width: barWidth
    };
  }, [position, horizontal, barWidth]);

  const modifiedCornerRadius = React.useMemo(() => {
    // "Rotate" the corner radius for a horizontal chart
    if (horizontal) {
      const isPositive = position.x1 - position.x0 > 0;
      return {
        topRight: isPositive ? cornerRadius.topLeft : cornerRadius.bottomLeft,
        bottomRight: isPositive
          ? cornerRadius.topRight
          : cornerRadius.bottomRight,
        bottomLeft: isPositive
          ? cornerRadius.bottomRight
          : cornerRadius.topRight,
        topLeft: isPositive ? cornerRadius.bottomLeft : cornerRadius.topLeft
      };
    }
    const isPositive = position.y0 - position.y1 > 0;
    if (!isPositive) {
      return {
        topRight: cornerRadius.bottomLeft,
        bottomRight: cornerRadius.topLeft,
        bottomLeft: cornerRadius.topRight,
        topLeft: cornerRadius.bottomRight
      };
    }

    return cornerRadius;
  }, [cornerRadius, horizontal, position]);

  const draw = React.useCallback(
    (ctx) => {
      const { topLeft, topRight, bottomLeft, bottomRight } =
        modifiedCornerRadius;
      // eslint-disable-next-line no-shadow
      const { x, y, width, height } = barPosition;
      ctx.beginPath();
      ctx.fillStyle = style.fill;
      ctx.strokeStyle = style.stroke;
      ctx.globalAlpha = style.fillOpacity;
      ctx.lineWidth = style.strokeWidth;
      // Start at top left
      ctx.moveTo(x + topLeft, y);
      ctx.lineTo(x + width - topRight, y);
      // Top right corner
      ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
      ctx.lineTo(x + width, y + height - bottomRight);
      // Bottom right corner
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - bottomRight,
        y + height
      );
      ctx.lineTo(x + bottomLeft, y + height);
      // Bottom left corner
      ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
      ctx.lineTo(x, y + topLeft);
      // Top left corner
      ctx.quadraticCurveTo(x, y, x + topLeft, y);

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    },
    [style, barPosition, modifiedCornerRadius]
  );

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    draw(ctx);
  }, [canvasRef, draw]);

  return null;
};

Bar.propTypes = {
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
      bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
    })
  ]),
  datum: PropTypes.object,
  horizontal: PropTypes.bool,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  y0: PropTypes.number
};

export default Bar;

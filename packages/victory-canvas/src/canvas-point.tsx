import React from "react";
import {
  Helpers,
  PointPathHelpers,
  ScatterSymbolType,
  VictoryCommonPrimitiveProps,
} from "victory-core";
import { useCanvasContext } from "./hooks/use-canvas-context";

export interface CanvasPointProps extends VictoryCommonPrimitiveProps {
  datum?: any;
  getPath?: (x: number, y: number, size: number) => string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  size?: number | Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  symbol?: ScatterSymbolType | Function;
  x?: number;
  y?: number;
}

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
    cross: PointPathHelpers.cross,
  };
  const symbolFunction =
    typeof pathFunctions[symbol] === "function"
      ? pathFunctions[symbol]
      : pathFunctions.circle;
  return symbolFunction(x, y, size);
};

const evaluateProps = (props: CanvasPointProps) => {
  /**
   * Potential evaluated props are:
   * `size`
   * `style`
   * `symbol`
   */
  const size = Helpers.evaluateProp(props.size, props);
  const style = Helpers.evaluateStyle(props.style, props);
  const symbol = Helpers.evaluateProp(props.symbol, props);

  return Object.assign({}, props, {
    size,
    style,
    symbol,
  });
};

export const CanvasPoint = (props: CanvasPointProps) => {
  const { canvasRef } = useCanvasContext();
  const modifiedProps = evaluateProps(props);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { style } = modifiedProps;
      const path = getPath(modifiedProps);
      ctx.fillStyle = style.fill;
      // eslint-disable-next-line no-undef
      const path2d = new Path2D(path);
      ctx.fill(path2d);
    },
    [modifiedProps],
  );

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    draw(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

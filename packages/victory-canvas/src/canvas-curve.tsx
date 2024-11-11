import React from "react";
import {
  LineHelpers,
  NumberOrCallback,
  StringOrCallback,
  VictoryCommonPrimitiveProps,
} from "victory-core";
import { useCanvasContext } from "./hooks/use-canvas-context";
import { LineRadial } from "../../victory-vendor/d3-shape";

export interface CanvasCurveProps extends VictoryCommonPrimitiveProps {
  ariaLabel?: StringOrCallback;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  interpolation?: string | Function;
  openCurve?: boolean;
  tabIndex?: NumberOrCallback;
}

export const CanvasCurve = (props: CanvasCurveProps) => {
  const { canvasRef, clear, clip } = useCanvasContext();
  const { style, data } = props;
  const { stroke, strokeWidth } = style;

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const line = LineHelpers.getLineFunction(props) as LineRadial<
        [number, number]
      >;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      line.context(ctx)(data);
      ctx.stroke();
    },
    [data, props, stroke, strokeWidth],
  );

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    clear(ctx);
    draw(ctx);
    clip(ctx);
  }, [canvasRef, draw, clear, clip]);

  return null;
};

import React from "react";
import { useCanvasContext } from "./hooks/use-canvas-context";
import { LineHelpers } from "victory-core";

const Curve = (props) => {
  const { canvasRef, clear, clip } = useCanvasContext();
  const { style, data } = props;
  const { stroke, strokeWidth } = style;

  const draw = React.useCallback(
    (ctx) => {
      const line = LineHelpers.getLineFunction(props);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      line.context(ctx)(data);
      ctx.stroke();
    },
    [data, props, stroke, strokeWidth]
  );

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    clear(ctx);
    draw(ctx);
    clip(ctx);
  }, [canvasRef, draw, clear, clip]);

  return null;
};

export default Curve;

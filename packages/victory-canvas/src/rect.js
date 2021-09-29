import React from "react";
import { useCanvasRef } from "./hooks/use-canvas-ref";

const Rect = ({ x, y, width, height }) => {
  const { canvasRef } = useCanvasRef();

  const draw = React.useCallback(
    (ctx) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();
    },
    [x, y, width, height]
  );

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    draw(ctx);
  }, [draw, canvasRef]);

  return null;
};

export default Rect;

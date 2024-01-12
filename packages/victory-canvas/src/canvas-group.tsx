import React from "react";
import { CanvasContext } from "./hooks/use-canvas-context";
import { PaddingProps } from "victory-core";

export interface CanvasGroupProps {
  children?: React.ReactNode | React.ReactNode[];
  clipWidth?: number;
  height?: number;
  padding?: PaddingProps;
  width?: number;
}

export const CanvasGroup = (props: CanvasGroupProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { children, width = 0, height = 0, clipWidth, padding } = props;

  const clear = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      return ctx.clearRect(0, 0, width, height);
    },
    [width, height],
  );

  // This needs to be called in the child component to ensure it is called after the
  // shape is drawn
  const clip = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const paddingRight =
        typeof padding === "number" ? padding : padding?.right || 0;
      const paddingLeft =
        typeof padding === "number" ? padding : padding?.left || 0;

      const maxClipWidth = width - paddingRight - paddingLeft;
      ctx.clearRect(
        width - paddingRight,
        0,
        clipWidth ? (maxClipWidth - clipWidth) * -1 : 0,
        height,
      );
    },
    [width, height, padding, clipWidth],
  );

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        clear,
        clip,
      }}
    >
      <foreignObject width={width} height={height} x={0} y={0}>
        <canvas width={width} height={height} ref={canvasRef} />
      </foreignObject>
      {children}
    </CanvasContext.Provider>
  );
};

CanvasGroup.role = "container";

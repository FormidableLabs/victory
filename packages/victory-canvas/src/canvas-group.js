import React from "react";
import { CanvasContext } from "./hooks/use-canvas-context";
import { VictoryClipContainer } from "victory-core";

const CanvasGroup = (props) => {
  const canvasRef = React.useRef();
  const { children, width, height, clipWidth, padding } = props;

  const clear = React.useCallback(
    (ctx) => {
      return ctx.clearRect(0, 0, width, height);
    },
    [width, height]
  );

  // This needs to be called in the child component to ensure it is called after the
  // shape is drawn
  const clip = React.useCallback(
    (ctx) => {
      const maxClipWidth = width - padding.right - padding.left;
      ctx.clearRect(
        width - padding.right,
        0,
        (maxClipWidth - clipWidth) * -1,
        height
      );
    },
    [width, height, padding, clipWidth]
  );

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        clear,
        clip
      }}
    >
      <foreignObject width={width} height={height} x={0} y={0}>
        <canvas width={width} height={height} ref={canvasRef} />
      </foreignObject>
      {children}
    </CanvasContext.Provider>
  );
};

CanvasGroup.propTypes = VictoryClipContainer.propTypes;
CanvasGroup.role = "container";
CanvasGroup.displayName = "CanvasGroup";

export default CanvasGroup;

import React from "react";
import { CanvasContext } from "./hooks/use-canvas-ref";
import PropTypes from "prop-types";

const CanvasContainer = (props) => {
  const canvasRef = React.useRef();
  const { width, height, children } = props;

  const clear = React.useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");
    return ctx.clearRect(0, 0, width, height);
  }, [width, height]);

  return (
    <CanvasContext.Provider value={{ canvasRef, clear, width, height }}>
      <foreignObject width={width} height={height} x={0} y={0}>
        <canvas width={width} height={height} ref={canvasRef} />
      </foreignObject>
      {children}
    </CanvasContext.Provider>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number
};
CanvasContainer.role = "container";
CanvasContainer.displayName = "CanvasContainer";

export default CanvasContainer;

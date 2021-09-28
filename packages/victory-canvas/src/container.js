import React from "react";
import { VictoryContainer } from "../../victory-core/lib";
import { CanvasContext } from "./hooks/use-canvas-ref";

const Container = (props) => {
  const canvasRef = React.useRef();
  const { height, width } = props.children.props;
  return (
    <CanvasContext.Provider value={canvasRef}>
      <canvas width={width} height={height} ref={canvasRef} />
      <VictoryContainer {...props}></VictoryContainer>
    </CanvasContext.Provider>
  );
};

export default Container;

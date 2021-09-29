import { assign, defaults } from "lodash";
import React from "react";
import { VictoryContainer } from "../../victory-core/lib";
import { CanvasContext } from "./hooks/use-canvas-ref";

const CanvasContainer = (props) => {
  const canvasRef = React.useRef();
  const {
    className,
    width,
    height,
    responsive,
    children,
    tabIndex,
    role,
    preserveAspectRatio,
    events,
    style
  } = props;
  const dimensions = responsive
    ? { width: "100%", height: "100%" }
    : { width, height };
  const divStyle = assign(
    { pointerEvents: "none", touchAction: "none", position: "relative" },
    dimensions
  );
  const svgProps = assign(
    {
      width,
      height,
      tabIndex,
      role,
      viewBox: responsive ? `0 0 ${width} ${height}` : undefined,
      preserveAspectRatio: responsive ? preserveAspectRatio : undefined
    },
    events
  );

  // Dimensions removed for now
  const svgStyle = assign({ pointerEvents: "all" });
  return (
    <CanvasContext.Provider value={canvasRef}>
      <div style={defaults({}, style, divStyle)} className={className}>
        <canvas
          style={{ position: "absolute", ...svgStyle }}
          width={props.width}
          height={props.height}
          ref={canvasRef}
        />
        <svg {...svgProps} style={svgStyle}>
          {children}
        </svg>
      </div>
    </CanvasContext.Provider>
  );
};

CanvasContainer.propTypes = VictoryContainer.propTypes;
CanvasContainer.role = "container";
CanvasContainer.displayName = "CanvasContainer";
CanvasContainer.defaultProps = {
  className: "CanvasContainer",
  responsive: true,
  role: "img"
};

export default CanvasContainer;

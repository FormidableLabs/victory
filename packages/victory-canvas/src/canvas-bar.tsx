import React from "react";
import {
  BarProps,
  VictoryBarAlignmentType,
  VictoryBarCornerRadiusObject,
  getBarPath,
  getBarWidth,
  getCornerRadius,
  getPolarBarPath,
  getStyle,
} from "victory-bar";
import { useCanvasContext } from "./hooks/use-canvas-context";
import { NumberOrCallback, VictoryCommonPrimitiveProps } from "victory-core";

export interface CanvasBarProps extends VictoryCommonPrimitiveProps {
  alignment?: VictoryBarAlignmentType;
  barOffset?: number[];
  barRatio?: number;
  barWidth?: NumberOrCallback;
  cornerRadius?: NumberOrCallback | VictoryBarCornerRadiusObject;
  datum?: any;
  getPath?: (props: CanvasBarProps) => string;
  horizontal?: boolean;
  width?: number;
  x?: number;
  y?: number;
  y0?: number;
}

const evaluateProps = (props: CanvasBarProps) => {
  /**
   * Potential evaluated props of following must be evaluated in this order:
   * 1) `style`
   * 2) `barWidth`
   * 3) `cornerRadius`
   */
  const style = getStyle(props.style, props as BarProps);
  const barWidth = getBarWidth(
    props.barWidth,
    Object.assign({}, props, { style }),
  );
  const cornerRadius = getCornerRadius(
    props.cornerRadius,
    Object.assign({}, props, { style, barWidth }),
  );
  const modifiedProps = Object.assign({}, props, {
    style,
    barWidth,
    cornerRadius,
  });
  return modifiedProps;
};

const usePreviousValue = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const CanvasBar = (props: CanvasBarProps) => {
  const { canvasRef } = useCanvasContext();
  const modifiedProps = evaluateProps(props);
  const { polar, style, barWidth, cornerRadius, origin } = modifiedProps;

  const path2d = React.useMemo(() => {
    const p = polar
      ? getPolarBarPath(modifiedProps, cornerRadius)
      : getBarPath(modifiedProps, barWidth, cornerRadius);

    return new Path2D(p);
  }, [polar, barWidth, cornerRadius, modifiedProps]);

  const previousPath = usePreviousValue(path2d);

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, path: Path2D) => {
      ctx.fillStyle = style.fill;
      ctx.strokeStyle = style.stroke;
      ctx.globalAlpha = style.fillOpacity;
      ctx.lineWidth = style.strokeWidth;

      if (polar) {
        ctx.translate(origin?.x || 0, origin?.y || 0);
      }
      ctx.fill(path);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    },
    [style, origin, polar],
  );

  // This will clear the previous bar without clearing the entire canvas
  const clearPreviousPath = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (previousPath) {
        ctx.save();
        // This ensures that the entire shape is erased
        const strokeWidth = (style.strokeWidth as number) || 0;
        ctx.lineWidth = strokeWidth + 2;

        ctx.globalCompositeOperation = "destination-out";
        draw(ctx, previousPath);
        ctx.stroke(previousPath);

        ctx.restore();
      }
    },
    [draw, previousPath, style],
  );

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    clearPreviousPath(ctx);
    draw(ctx, path2d);
  }, [
    canvasRef,
    draw,
    polar,
    barWidth,
    cornerRadius,
    modifiedProps,
    path2d,
    clearPreviousPath,
  ]);

  return null;
};

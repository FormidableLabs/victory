import React from "react";
import {
  VictoryContainer,
  Selection,
  Rect,
  DomainTuple,
  VictoryContainerProps,
} from "victory-core";
import { BrushHelpers } from "./brush-helpers";
import { defaults } from "lodash";
import isEqual from "react-fast-compare";

export interface VictoryBrushContainerProps extends VictoryContainerProps {
  allowDrag?: boolean;
  allowDraw?: boolean;
  allowResize?: boolean;
  brushComponent?: React.ReactElement;
  brushDimension?: "x" | "y";
  brushDomain?: { x?: DomainTuple; y?: DomainTuple };
  brushStyle?: React.CSSProperties;
  defaultBrushArea?: "all" | "none" | "disable" | "move";
  disable?: boolean;
  handleComponent?: React.ReactElement;
  handleStyle?: React.CSSProperties;
  handleWidth?: number;
  onBrushCleared?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChange?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
  onBrushDomainChangeEnd?: (
    domain: { x: DomainTuple; y: DomainTuple },
    props: VictoryBrushContainerProps,
  ) => void;
}

type ComponentClass<TProps> = { new (props: TProps): React.Component<TProps> };

export function brushContainerMixin<
  TBase extends ComponentClass<TProps>,
  TProps extends VictoryBrushContainerProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryBrushContainer extends Base {
    static displayName = "VictoryBrushContainer";
    static defaultProps = {
      ...VictoryContainer.defaultProps,
      allowDrag: true,
      allowDraw: true,
      allowResize: true,
      brushComponent: <Rect />,
      brushStyle: {
        stroke: "transparent",
        fill: "black",
        fillOpacity: 0.1,
      },
      handleComponent: <Rect />,
      handleStyle: {
        stroke: "transparent",
        fill: "transparent",
      },
      handleWidth: 8,
      mouseMoveThreshold: 0,
    };

    static defaultEvents(props) {
      return [
        {
          target: "parent",
          eventHandlers: {
            onMouseDown: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onMouseDown(evt, targetProps);
            },
            onTouchStart: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onMouseDown(evt, targetProps);
            },
            onGlobalMouseMove: (evt, targetProps) => {
              return props.disable ||
                (!targetProps.isPanning && !targetProps.isSelecting)
                ? {}
                : BrushHelpers.onGlobalMouseMove(evt, targetProps);
            },
            onGlobalTouchMove: (evt, targetProps) => {
              return props.disable ||
                (!targetProps.isPanning && !targetProps.isSelecting)
                ? {}
                : BrushHelpers.onGlobalMouseMove(evt, targetProps);
            },
            onGlobalMouseUp: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onGlobalMouseUp(evt, targetProps);
            },
            onGlobalTouchEnd: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onGlobalMouseUp(evt, targetProps);
            },
            onGlobalTouchCancel: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onGlobalMouseUp(evt, targetProps);
            },
          },
        },
      ];
    }

    getSelectBox(props, coordinates) {
      const { x, y } = coordinates;
      const { brushStyle, brushComponent, name } = props;
      const brushComponentStyle =
        brushComponent.props && brushComponent.props.style;
      const cursor = !props.allowDrag && !props.allowResize ? "auto" : "move";
      return x[0] !== x[1] && y[0] !== y[1]
        ? React.cloneElement(brushComponent, {
            key: `${name}-brush`,
            width: Math.abs(x[1] - x[0]) || 1,
            height: Math.abs(y[1] - y[0]) || 1,
            x: Math.min(x[0], x[1]),
            y: Math.min(y[0], y[1]),
            cursor,
            style: defaults({}, brushComponentStyle, brushStyle),
          })
        : null;
    }

    getCursorPointers(props) {
      const cursors = {
        yProps: "ns-resize",
        xProps: "ew-resize",
      };
      if (!props.allowResize && props.allowDrag) {
        cursors.xProps = "move";
        cursors.yProps = "move";
      } else if (!props.allowResize && !props.allowDrag) {
        cursors.xProps = "auto";
        cursors.yProps = "auto";
      }
      return cursors;
    }

    getHandles(props, domain) {
      const { handleWidth, handleStyle, handleComponent, name } = props;
      const domainBox = BrushHelpers.getDomainBox(props, domain);
      const { x1, x2, y1, y2 } = domainBox;
      const { top, bottom, left, right } = BrushHelpers.getHandles(
        props,
        domainBox,
      );
      const width = Math.abs(x2 - x1) || 1;
      const height = Math.abs(y2 - y1) || 1;
      const handleComponentStyle =
        (handleComponent.props && handleComponent.props.style) || {};
      const style = defaults({}, handleComponentStyle, handleStyle);

      const cursors = this.getCursorPointers(props);
      const yProps = {
        style,
        width,
        height: handleWidth,
        cursor: cursors.yProps,
      };
      const xProps = {
        style,
        width: handleWidth,
        height,
        cursor: cursors.xProps,
      };

      const handleProps = {
        top: top && Object.assign({ x: top.x1, y: top.y1 }, yProps),
        bottom: bottom && Object.assign({ x: bottom.x1, y: bottom.y1 }, yProps),
        left: left && Object.assign({ y: left.y1, x: left.x1 }, xProps),
        right: right && Object.assign({ y: right.y1, x: right.x1 }, xProps),
      };
      const handles = ["top", "bottom", "left", "right"].reduce(
        (memo, curr) =>
          handleProps[curr]
            ? memo.concat(
                React.cloneElement(
                  handleComponent,
                  Object.assign(
                    { key: `${name}-handle-${curr}` },
                    handleProps[curr],
                  ),
                ),
              )
            : memo,
        [] as React.ReactElement[],
      );
      return handles.length ? handles : null;
    }

    getRect(props) {
      const { currentDomain, cachedBrushDomain } = props;
      const brushDomain = defaults({}, props.brushDomain, props.domain);
      const domain = isEqual(brushDomain, cachedBrushDomain)
        ? defaults({}, currentDomain, brushDomain)
        : brushDomain;
      const coordinates = Selection.getDomainCoordinates(props, domain);
      const selectBox = this.getSelectBox(props, coordinates);
      return selectBox ? [selectBox, this.getHandles(props, domain)] : [];
    }

    // Overrides method in VictoryContainer
    getChildren(props) {
      return [
        ...React.Children.toArray(props.children),
        ...this.getRect(props),
      ];
    }
  };
}
export const VictoryBrushContainer = brushContainerMixin(VictoryContainer);

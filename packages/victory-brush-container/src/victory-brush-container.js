import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, Selection, Rect } from "victory-core";
import BrushHelpers from "./brush-helpers";
import { assign, defaults } from "lodash";
import isEqual from "react-fast-compare";

export const brushContainerMixin = (base) =>
  class VictoryBrushContainer extends base {
    static displayName = "VictoryBrushContainer";
    static propTypes = {
      ...VictoryContainer.propTypes,
      allowDrag: PropTypes.bool,
      allowDraw: PropTypes.bool,
      allowResize: PropTypes.bool,
      brushComponent: PropTypes.element,
      brushDimension: PropTypes.oneOf(["x", "y"]),
      brushDomain: PropTypes.shape({
        x: PropTypes.array,
        y: PropTypes.array
      }),
      brushStyle: PropTypes.object,
      defaultBrushArea: PropTypes.oneOf(["all", "disable", "none", "move"]),
      disable: PropTypes.bool,
      handleComponent: PropTypes.element,
      handleStyle: PropTypes.object,
      handleWidth: PropTypes.number,
      onBrushCleared: PropTypes.func,
      onBrushDomainChange: PropTypes.func,
      onBrushDomainChangeEnd: PropTypes.func
    };
    static defaultProps = {
      ...VictoryContainer.defaultProps,
      allowDrag: true,
      allowDraw: true,
      allowResize: true,
      brushComponent: <Rect />,
      brushStyle: {
        stroke: "transparent",
        fill: "black",
        fillOpacity: 0.1
      },
      handleComponent: <Rect />,
      handleStyle: {
        stroke: "transparent",
        fill: "transparent"
      },
      handleWidth: 8,
      mouseMoveThreshold: 0
    };

    static defaultEvents = (props) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onMouseDown: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseDown(evt, targetProps);
            },
            onTouchStart: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseDown(evt, targetProps);
            },
            onMouseMove: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseMove(evt, targetProps);
            },
            onMouseUp: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseUp(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseUp(evt, targetProps);
            },
            onMouseLeave: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseLeave(evt, targetProps);
            },
            onTouchCancel: (evt, targetProps) => {
              return props.disable ? {} : BrushHelpers.onMouseLeave(evt, targetProps);
            }
          }
        }
      ];
    };

    getSelectBox(props, coordinates) {
      const { x, y } = coordinates;
      const { brushStyle, brushComponent, name } = props;
      const brushComponentStyle = brushComponent.props && brushComponent.props.style;
      const cursor = !props.allowDrag && !props.allowResize ? "auto" : "move";
      return x[0] !== x[1] && y[0] !== y[1]
        ? React.cloneElement(brushComponent, {
            key: `${name}-brush`,
            width: Math.abs(x[1] - x[0]) || 1,
            height: Math.abs(y[1] - y[0]) || 1,
            x: Math.min(x[0], x[1]),
            y: Math.min(y[0], y[1]),
            cursor,
            style: defaults({}, brushComponentStyle, brushStyle)
          })
        : null;
    }

    getCursorPointers(props) {
      const cursors = {
        yProps: "ns-resize",
        xProps: "ew-resize"
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
      const { top, bottom, left, right } = BrushHelpers.getHandles(props, domainBox);
      const width = Math.abs(x2 - x1) || 1;
      const height = Math.abs(y2 - y1) || 1;
      const handleComponentStyle = (handleComponent.props && handleComponent.props.style) || {};
      const style = defaults({}, handleComponentStyle, handleStyle);

      const cursors = this.getCursorPointers(props);
      const yProps = { style, width, height: handleWidth, cursor: cursors.yProps };
      const xProps = { style, width: handleWidth, height, cursor: cursors.xProps };

      const handleProps = {
        top: top && assign({ x: top.x1, y: top.y1 }, yProps),
        bottom: bottom && assign({ x: bottom.x1, y: bottom.y1 }, yProps),
        left: left && assign({ y: left.y1, x: left.x1 }, xProps),
        right: right && assign({ y: right.y1, x: right.x1 }, xProps)
      };
      const handles = ["top", "bottom", "left", "right"].reduce((memo, curr) => {
        memo = handleProps[curr]
          ? memo.concat(
              React.cloneElement(
                handleComponent,
                assign({ key: `${name}-handle-${curr}` }, handleProps[curr])
              )
            )
          : memo;
        return memo;
      }, []);
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
      return [...React.Children.toArray(props.children), ...this.getRect(props)];
    }
  };

export default brushContainerMixin(VictoryContainer);

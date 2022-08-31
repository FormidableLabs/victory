import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, Rect } from "victory-core";
import SelectionHelpers from "./selection-helpers";

export const selectionContainerMixin = (base) =>
  class VictorySelectionContainer extends base {
    static displayName = "VictorySelectionContainer";
    static propTypes = {
      ...VictoryContainer.propTypes,
      activateSelectedData: PropTypes.bool,
      allowSelection: PropTypes.bool,
      disable: PropTypes.bool,
      onSelection: PropTypes.func,
      onSelectionCleared: PropTypes.func,
      selectionBlacklist: PropTypes.arrayOf(PropTypes.string),
      selectionComponent: PropTypes.element,
      selectionDimension: PropTypes.oneOf(["x", "y"]),
      selectionStyle: PropTypes.object,
    };
    static defaultProps = {
      ...VictoryContainer.defaultProps,
      activateSelectedData: true,
      allowSelection: true,
      selectionComponent: <Rect />,
      selectionStyle: {
        stroke: "transparent",
        fill: "black",
        fillOpacity: 0.1,
      },
    };

    static defaultEvents = (props) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onMouseDown: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseDown(evt, targetProps);
            },
            onTouchStart: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseDown(evt, targetProps);
            },
            onMouseMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseMove(evt, targetProps);
            },
            onMouseUp: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseUp(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseUp(evt, targetProps);
            },
          },
        },
      ];
    };

    getRect(props) {
      const { x1, x2, y1, y2, selectionStyle, selectionComponent, name } =
        props;
      const width = Math.abs(x2 - x1) || 1;
      const height = Math.abs(y2 - y1) || 1;
      const x = Math.min(x1, x2);
      const y = Math.min(y1, y2);
      return y2 && x2 && x1 && y1
        ? React.cloneElement(selectionComponent, {
            key: `${name}-selection`,
            x,
            y,
            width,
            height,
            style: selectionStyle,
          })
        : null;
    }

    // Overrides method in VictoryContainer
    getChildren(props) {
      return [...React.Children.toArray(props.children), this.getRect(props)];
    }
  };

export default selectionContainerMixin(VictoryContainer);
// @ts-expect-error IMPORTANT: when converting this file to TypeScript, you must export the type as well:
// export const VictorySelectionContainer = selectionContainerMixin(VictoryContainer);
// export type VictorySelectionContainer = typeof VictorySelectionContainer;

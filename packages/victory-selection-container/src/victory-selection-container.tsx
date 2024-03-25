import React from "react";
import {
  Datum,
  Rect,
  VictoryContainer,
  VictoryContainerProps,
} from "victory-core";
import { SelectionHelpers } from "./selection-helpers";

export interface VictorySelectionContainerProps extends VictoryContainerProps {
  activateSelectedData?: boolean;
  allowSelection?: boolean;
  disable?: boolean;
  onSelection?: (
    points: {
      childName?: string | string[];
      eventKey?: string | number;
      data?: Datum[];
    }[],
    bounds: {
      x: number | Date;
      y: number | Date;
    }[],
    props: VictorySelectionContainerProps,
  ) => void;
  horizontal?: boolean;
  onSelectionCleared?: (props: VictorySelectionContainerProps) => void;
  selectionBlacklist?: string[];
  selectionComponent?: React.ReactElement;
  selectionDimension?: "x" | "y";
  selectionStyle?: React.CSSProperties;
}

type ComponentClass<TProps> = { new (props: TProps): React.Component<TProps> };

export function selectionContainerMixin<
  TBase extends ComponentClass<TProps>,
  TProps extends VictorySelectionContainerProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictorySelectionContainer extends Base {
    static displayName = "VictorySelectionContainer";
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

    static defaultEvents(props: TProps) {
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
    }

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
    getChildren(props: TProps) {
      return [...React.Children.toArray(props.children), this.getRect(props)];
    }
  };
}

export const VictorySelectionContainer =
  selectionContainerMixin(VictoryContainer);

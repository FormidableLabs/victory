import React from "react";
import {
  Helpers,
  VictoryContainerProps,
  CoordinatesPropType,
  VictoryLabelProps,
  ValueOrAccessor,
  VictoryLabel,
  LineSegment,
  VictoryContainer,
  VictoryEventHandler,
  DomainTuple,
  PaddingProps,
} from "victory-core";
import defaults from "lodash/defaults";
import isObject from "lodash/isObject";
import { CursorHelpers } from "./cursor-helpers";

export type CursorCoordinatesPropType = CoordinatesPropType | number;

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: ValueOrAccessor<VictoryLabelProps["text"]>;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: CursorCoordinatesPropType;
  defaultCursorValue?: CursorCoordinatesPropType;
  disable?: boolean;
  horizontal?: boolean;
  padding?: PaddingProps;
  onCursorChange?: (
    value: CursorCoordinatesPropType,
    props: VictoryCursorContainerProps,
  ) => void;
}

interface VictoryCursorContainerMutatedProps
  extends VictoryCursorContainerProps {
  cursorValue: CoordinatesPropType | null;
  domain: { x: DomainTuple; y: DomainTuple };
}

export const VICTORY_CURSOR_CONTAINER_DEFAULT_PROPS = {
  cursorLabelComponent: <VictoryLabel />,
  cursorLabelOffset: {
    x: 5,
    y: -10,
  },
  cursorComponent: <LineSegment />,
};

export const useVictoryCursorContainer = (
  initialProps: VictoryCursorContainerProps,
) => {
  const props = {
    ...VICTORY_CURSOR_CONTAINER_DEFAULT_PROPS,
    ...(initialProps as VictoryCursorContainerMutatedProps),
  };
  const { children } = props;

  const getCursorPosition = () => {
    const { cursorValue, defaultCursorValue, domain, cursorDimension } = props;
    if (cursorValue) {
      return cursorValue;
    }

    if (typeof defaultCursorValue === "number") {
      return {
        x: ((domain.x[0] as number) + (domain.x[1] as number)) / 2,
        y: ((domain.y[0] as number) + (domain.y[1] as number)) / 2,
        ...(cursorDimension ? { [cursorDimension]: defaultCursorValue } : {}),
      };
    }

    return defaultCursorValue;
  };

  const getCursorLabelOffset = () => {
    const { cursorLabelOffset } = props;

    if (typeof cursorLabelOffset === "number") {
      return {
        x: cursorLabelOffset,
        y: cursorLabelOffset,
      };
    }

    return cursorLabelOffset;
  };

  const getPadding = () => {
    if (props.padding === undefined) {
      const child = Array.isArray(props.children)
        ? props.children.find((c: any) => {
            return isObject(c.props) && c.props.padding !== undefined;
          })
        : props.children;
      return Helpers.getPadding(child?.props?.padding);
    }
    return Helpers.getPadding(props.padding);
  };

  const getCursorElements = () => {
    const {
      scale,
      cursorLabelComponent,
      cursorLabel,
      cursorComponent,
      width,
      height,
      name,
      horizontal,
      theme,
    } = props;
    const cursorDimension = CursorHelpers.getDimension(props);
    const cursorValue = getCursorPosition();
    const cursorLabelOffset = getCursorLabelOffset();

    if (!cursorValue) {
      return [];
    }

    const newElements: React.ReactElement[] = [];
    const padding = getPadding();
    const cursorCoordinates =
      scale &&
      "x" in scale &&
      "y" in scale &&
      typeof scale.y === "function" &&
      typeof scale.x === "function"
        ? {
            x: horizontal ? scale.y(cursorValue.y) : scale.x(cursorValue.x),
            y: horizontal ? scale.x(cursorValue.x) : scale.y(cursorValue.y),
          }
        : {
            x: cursorValue.x,
            y: cursorValue.y,
          };
    if (cursorLabel) {
      let labelProps = defaults({ active: true }, cursorLabelComponent.props, {
        x: cursorCoordinates.x + cursorLabelOffset.x,
        y: cursorCoordinates.y + cursorLabelOffset.y,
        datum: cursorValue,
        active: true,
        key: `${name}-cursor-label`,
      });
      if (Helpers.isTooltip(cursorLabelComponent)) {
        const tooltipTheme = (theme && theme.tooltip) || {};
        labelProps = defaults({}, labelProps, tooltipTheme);
      }
      newElements.push(
        React.cloneElement(
          cursorLabelComponent,
          defaults({}, labelProps, {
            text: Helpers.evaluateProp(cursorLabel, labelProps),
          }),
        ),
      );
    }

    const cursorStyle = Object.assign(
      { stroke: "black" },
      cursorComponent.props.style,
    );
    if (cursorDimension === "x" || cursorDimension === undefined) {
      newElements.push(
        React.cloneElement(cursorComponent, {
          key: `${name}-x-cursor`,
          x1: cursorCoordinates.x,
          x2: cursorCoordinates.x,
          y1: padding.top,
          y2: (typeof height === "number" ? height : 0) - padding.bottom,
          style: cursorStyle,
        }),
      );
    }
    if (cursorDimension === "y" || cursorDimension === undefined) {
      newElements.push(
        React.cloneElement(cursorComponent, {
          key: `${name}-y-cursor`,
          x1: padding.left,
          x2: (typeof width === "number" ? width : 0) - padding.right,
          y1: cursorCoordinates.y,
          y2: cursorCoordinates.y,
          style: cursorStyle,
        }),
      );
    }
    return newElements;
  };

  return {
    props,
    children: [
      ...React.Children.toArray(children),
      ...getCursorElements(),
    ] as React.ReactElement[],
  };
};

export const VictoryCursorContainer = (
  initialProps: VictoryCursorContainerProps,
) => {
  const { props, children } = useVictoryCursorContainer(initialProps);
  return <VictoryContainer {...props}>{children}</VictoryContainer>;
};

VictoryCursorContainer.role = "container";

VictoryCursorContainer.defaultEvents = (
  initialProps: VictoryCursorContainerProps,
) => {
  const props = { ...VICTORY_CURSOR_CONTAINER_DEFAULT_PROPS, ...initialProps };
  const createEventHandler =
    (handler: VictoryEventHandler, disabled?: boolean): VictoryEventHandler =>
    // eslint-disable-next-line max-params
    (event, targetProps, eventKey, context) =>
      disabled || props.disable
        ? {}
        : handler(event, { ...props, ...targetProps }, eventKey, context);

  return [
    {
      target: "parent",
      eventHandlers: {
        onMouseLeave: createEventHandler(CursorHelpers.onMouseLeave),
        onMouseMove: createEventHandler(CursorHelpers.onMouseMove),
        onTouchMove: createEventHandler(CursorHelpers.onMouseMove),
      },
    },
  ];
};

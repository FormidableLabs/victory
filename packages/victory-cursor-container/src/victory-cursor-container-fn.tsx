import React from "react";
import {
  Helpers,
  VictoryContainerProps,
  CoordinatesPropType,
  VictoryLabelProps,
  ValueOrAccessor,
  VictoryLabel,
  LineSegment,
  VictoryContainerFn,
} from "victory-core";
import { defaults, isObject } from "lodash";
import { CursorHelpers } from "./cursor-helpers";

type Handler = (
  event: any,
  targetProps: any,
  eventKey?: any,
  context?: any,
) => void;

export type CursorCoordinatesPropType = CoordinatesPropType | number;

export interface VictoryCursorContainerProps extends VictoryContainerProps {
  cursorComponent?: React.ReactElement;
  cursorDimension?: "x" | "y";
  cursorLabel?: ValueOrAccessor<VictoryLabelProps["text"]>;
  cursorLabelComponent?: React.ReactElement;
  cursorLabelOffset?: CursorCoordinatesPropType;
  defaultCursorValue?: CursorCoordinatesPropType;
  disable?: boolean;
  onCursorChange?: (
    value: CursorCoordinatesPropType,
    props: VictoryCursorContainerProps,
  ) => void;
}

const defaultProps = {
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
  const props = { ...defaultProps, ...initialProps };
  const { children } = props;

  const getCursorPosition = () => {
    const { cursorValue, defaultCursorValue, domain, cursorDimension } = props;
    if (cursorValue) {
      return cursorValue;
    }

    if (typeof defaultCursorValue === "number") {
      return {
        x: (domain.x[0] + domain.x[1]) / 2,
        y: (domain.y[0] + domain.y[1]) / 2,
        [cursorDimension]: defaultCursorValue,
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
      const child = props.children.find((c) => {
        return isObject(c.props) && c.props.padding !== undefined;
      });
      return Helpers.getPadding(child.props);
    }
    return Helpers.getPadding(props);
  };

  const getCursorElements = () => {
    // eslint-disable-line max-statements
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
    const cursorCoordinates = {
      x: horizontal ? scale.y(cursorValue.y) : scale.x(cursorValue.x),
      y: horizontal ? scale.x(cursorValue.x) : scale.y(cursorValue.y),
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
          y2: height - padding.bottom,
          style: cursorStyle,
        }),
      );
    }
    if (cursorDimension === "y" || cursorDimension === undefined) {
      newElements.push(
        React.cloneElement(cursorComponent, {
          key: `${name}-y-cursor`,
          x1: padding.left,
          x2: width - padding.right,
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

export const VictoryCursorContainerFn = (
  initialProps: VictoryCursorContainerProps,
) => {
  const { props, children } = useVictoryCursorContainer(initialProps);
  return <VictoryContainerFn {...props}>{children}</VictoryContainerFn>;
};

VictoryCursorContainerFn.role = "container";

VictoryCursorContainerFn.defaultEvents = (
  initialProps: VictoryCursorContainerProps,
) => {
  const props = { ...defaultProps, ...initialProps };
  const createEventHandler =
    (handler: Handler, disabled?: boolean): Handler =>
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

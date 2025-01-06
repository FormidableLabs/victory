import React from "react";
import defaults from "lodash/defaults";
import pick from "lodash/pick";
import { VictoryTooltip } from "victory-tooltip";
import {
  Helpers,
  VictoryContainerProps,
  PaddingProps,
  VictoryContainer,
  VictoryEventHandler,
} from "victory-core";
import { VoronoiHelpers } from "./voronoi-helpers";

export interface VictoryVoronoiContainerProps extends VictoryContainerProps {
  activateData?: boolean;
  activateLabels?: boolean;
  disable?: boolean;
  labels?: (point: any, index?: number, points?: any[]) => string;
  labelComponent?: React.ReactElement;
  mouseFollowTooltips?: boolean;
  onActivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  onDeactivated?: (points: any[], props: VictoryVoronoiContainerProps) => void;
  radius?: number;
  voronoiBlacklist?: (string | RegExp)[];
  voronoiDimension?: "x" | "y";
  voronoiPadding?: PaddingProps;
  horizontal?: boolean;
}

interface VictoryVoronoiContainerMutatedProps
  extends VictoryVoronoiContainerProps {
  mousePosition: { x: number; y: number };
  activePoints: any[];
}

export const VICTORY_VORONOI_CONTAINER_DEFAULT_PROPS = {
  activateData: true,
  activateLabels: true,
  labelComponent: <VictoryTooltip />,
  voronoiPadding: 5,
};

const getPoint = (point) => {
  const whitelist = ["_x", "_x1", "_x0", "_y", "_y1", "_y0"];
  return pick(point, whitelist);
};

export const useVictoryVoronoiContainer = (
  initialProps: VictoryVoronoiContainerProps,
) => {
  const props = {
    ...VICTORY_VORONOI_CONTAINER_DEFAULT_PROPS,
    ...(initialProps as VictoryVoronoiContainerMutatedProps),
  };
  const { children } = props;

  const getDimension = () => {
    const { horizontal, voronoiDimension } = props;
    if (!horizontal || !voronoiDimension) {
      return voronoiDimension;
    }
    return voronoiDimension === "x" ? "y" : "x";
  };

  const getLabelPosition = (labelProps, points) => {
    const { mousePosition, mouseFollowTooltips } = props;
    const voronoiDimension = getDimension();
    const point = getPoint(points[0]);

    // @ts-expect-error scale is defined but the types do not reflect that
    const basePosition = Helpers.scalePoint(props, point);

    let center = mouseFollowTooltips ? mousePosition : undefined;
    if (!voronoiDimension || points.length < 2) {
      return {
        ...basePosition,
        center: defaults({}, labelProps.center, center),
      };
    }

    const x = voronoiDimension === "y" ? mousePosition.x : basePosition.x;
    const y = voronoiDimension === "x" ? mousePosition.y : basePosition.y;
    center = mouseFollowTooltips ? mousePosition : { x, y };
    return { x, y, center: defaults({}, labelProps.center, center) };
  };

  const getStyle = (points, type) => {
    const { labels, labelComponent, theme } = props;
    const componentProps = labelComponent.props || {};
    const themeStyles =
      theme && theme.voronoi && theme.voronoi.style ? theme.voronoi.style : {};
    const componentStyleArray =
      type === "flyout" ? componentProps.flyoutStyle : componentProps.style;
    return points.reduce((memo, datum, index) => {
      const labelProps = defaults({}, componentProps, {
        datum,
        active: true,
      });
      const text = Helpers.isFunction(labels) ? labels(labelProps) : undefined;
      const textArray = text !== undefined ? `${text}`.split("\n") : [];
      const baseStyle = (datum.style && datum.style[type]) || {};
      const componentStyle = Array.isArray(componentStyleArray)
        ? componentStyleArray[index]
        : componentStyleArray;
      const style = Helpers.evaluateStyle(
        defaults({}, componentStyle, baseStyle, themeStyles[type]),
        labelProps,
      );
      const styleArray = textArray.length
        ? textArray.map(() => style)
        : [style];
      return memo.concat(styleArray);
    }, []);
  };

  const getDefaultLabelProps = (points) => {
    const { voronoiDimension, horizontal, mouseFollowTooltips } = props;
    const point = getPoint(points[0]);
    const multiPoint = voronoiDimension && points.length > 1;
    const y = point._y1 !== undefined ? point._y1 : point._y;
    const defaultHorizontalOrientation = y < 0 ? "left" : "right";
    const defaultOrientation = y < 0 ? "bottom" : "top";
    const labelOrientation = horizontal
      ? defaultHorizontalOrientation
      : defaultOrientation;
    const orientation = mouseFollowTooltips ? undefined : labelOrientation;
    return {
      orientation,
      pointerLength: multiPoint ? 0 : undefined,
      constrainToVisibleArea:
        multiPoint || mouseFollowTooltips ? true : undefined,
    };
  };

  const getLabelProps = (points) => {
    const { labels, scale, labelComponent, theme, width, height } = props;
    const componentProps = labelComponent.props || {};
    const text = points.reduce((memo, datum) => {
      const labelProps = defaults({}, componentProps, {
        datum,
        active: true,
      });
      const t = Helpers.isFunction(labels) ? labels(labelProps) : null;
      if (t === null || t === undefined) {
        return memo;
      }
      return memo.concat(`${t}`.split("\n"));
    }, []);

    // remove properties from first point to make datum
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { childName, eventKey, style, continuous, ...datum } = points[0];
    const name =
      props.name === childName ? childName : `${props.name}-${childName}`;
    const labelProps = defaults(
      {
        key: `${name}-${eventKey}-voronoi-tooltip`,
        id: `${name}-${eventKey}-voronoi-tooltip`,
        active: true,
        renderInPortal: false,
        activePoints: points,
        datum,
        scale,
        theme,
      },
      componentProps,
      {
        text,
        width,
        height,
        style: getStyle(points, "labels"),
        flyoutStyle: getStyle(points, "flyout")[0],
      },
      getDefaultLabelProps(points),
    );
    const labelPosition = getLabelPosition(labelProps, points);

    return defaults({}, labelPosition, labelProps);
  };

  const getTooltip = () => {
    const { labels, activePoints, labelComponent } = props;
    if (!labels) {
      return null;
    }
    if (Array.isArray(activePoints) && activePoints.length) {
      const labelProps = getLabelProps(activePoints);
      const { text } = labelProps;
      const showLabel = Array.isArray(text)
        ? text.filter(Boolean).length
        : text;
      return showLabel ? React.cloneElement(labelComponent, labelProps) : null;
    }
    return null;
  };

  return {
    props,
    children: [
      ...React.Children.toArray(children),
      getTooltip(),
    ] as React.ReactElement[],
  };
};

export const VictoryVoronoiContainer = (
  initialProps: VictoryVoronoiContainerProps,
) => {
  const { props, children } = useVictoryVoronoiContainer(initialProps);
  return <VictoryContainer {...props}>{children}</VictoryContainer>;
};

VictoryVoronoiContainer.role = "container";

VictoryVoronoiContainer.defaultEvents = (
  initialProps: VictoryVoronoiContainerProps,
) => {
  const props = { ...VICTORY_VORONOI_CONTAINER_DEFAULT_PROPS, ...initialProps };
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
        onMouseLeave: createEventHandler(VoronoiHelpers.onMouseLeave),
        onTouchCancel: createEventHandler(VoronoiHelpers.onMouseLeave),
        onMouseMove: createEventHandler(VoronoiHelpers.onMouseMove),
        onTouchMove: createEventHandler(VoronoiHelpers.onMouseMove),
      },
    },
    {
      target: "data",
      eventHandlers: props.disable
        ? {}
        : {
            onMouseOver: () => null,
            onMouseOut: () => null,
            onMouseMove: () => null,
          },
    },
  ];
};

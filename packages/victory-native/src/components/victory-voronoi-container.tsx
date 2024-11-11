import React from "react";
import { VictoryEventHandler } from "victory-core";
import {
  VictoryVoronoiContainerProps,
  VoronoiHelpers,
  useVictoryVoronoiContainer,
  VICTORY_VORONOI_CONTAINER_DEFAULT_PROPS,
} from "victory-voronoi-container";
import { VictoryContainer } from "./victory-container";
import { VictoryTooltip } from "./victory-tooltip";

export interface VictoryVoronoiContainerNativeProps
  extends VictoryVoronoiContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

const DEFAULT_VORONOI_PADDING = 5;

export const VictoryVoronoiContainer = (
  initialProps: VictoryVoronoiContainerNativeProps,
) => {
  const props = useVictoryVoronoiContainer({
    ...initialProps,
    activateData: initialProps.activateData ?? true,
    activateLabels: initialProps.activateLabels ?? true,
    labelComponent: initialProps.labelComponent ?? <VictoryTooltip />,
    voronoiPadding: initialProps.voronoiPadding ?? DEFAULT_VORONOI_PADDING,
  });
  return <VictoryContainer {...props} />;
};

VictoryVoronoiContainer.role = "container";

VictoryVoronoiContainer.defaultEvents = (
  initialProps: VictoryVoronoiContainerNativeProps,
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
        onTouchStart: createEventHandler(VoronoiHelpers.onMouseMove),
        onTouchMove: createEventHandler(VoronoiHelpers.onMouseMove),
        onTouchEnd: createEventHandler(VoronoiHelpers.onMouseLeave),
      },
    },
    {
      target: "data",
      eventHandlers: props.disable
        ? {}
        : {
            onTouchStart: () => null,
            onTouchMove: () => null,
            onTouchEnd: () => null,
          },
    },
  ];
};

/* eslint-disable react/no-multi-comp */
import React from "react";
import { flow } from "lodash";
import {
  VictoryVoronoiContainer as VictoryVoronoiContainerBase,
  VictoryVoronoiContainerProps,
  VoronoiHelpers,
  voronoiContainerMixin as originalVoronoiMixin,
} from "victory-voronoi-container";
import { VictoryContainer } from "./victory-container";
import { VictoryTooltip } from "./victory-tooltip";

export interface VictoryVoronoiContainerNativeProps
  extends VictoryVoronoiContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: (
    evt?: any,
    targetProps?: any,
    eventKey?: any,
    ctx?: any,
  ) => void;
  onTouchEnd?: (
    evt?: any,
    targetProps?: any,
    eventKey?: any,
    ctx?: any,
  ) => void;
}

function nativeVoronoiMixin<
  TBase extends React.ComponentClass<TProps>,
  TProps extends VictoryVoronoiContainerNativeProps,
>(Base: TBase) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class VictoryNativeVoronoiContainer extends Base {
    // assign native specific defaultProps over web `VictoryVoronoiContainer` defaultProps
    static defaultProps = {
      ...VictoryVoronoiContainerBase.defaultProps,
      activateData: true,
      activateLabels: true,
      labelComponent: <VictoryTooltip />,
      voronoiPadding: 5,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props: TProps) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onTouchStart: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseMove(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              return props.disable
                ? {}
                : VoronoiHelpers.onMouseLeave(evt, targetProps);
            },
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
  };
}

const combinedMixin: (
  base: React.ComponentClass,
) => React.ComponentClass<VictoryVoronoiContainerNativeProps> = flow(
  originalVoronoiMixin,
  nativeVoronoiMixin,
);

export const voronoiContainerMixin = (base: React.ComponentClass) =>
  combinedMixin(base);

export const VictoryVoronoiContainer = voronoiContainerMixin(VictoryContainer);

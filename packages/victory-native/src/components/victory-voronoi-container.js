/* eslint-disable react/no-multi-comp */
import React from "react";
import { flow } from "lodash";
import {
  VictoryVoronoiContainer,
  VoronoiHelpers,
  voronoiContainerMixin as originalVoronoiMixin,
} from "victory-voronoi-container";
import VictoryContainer from "./victory-container";
import VictoryTooltip from "./victory-tooltip";

const nativeVoronoiMixin = (base) =>
  class VictoryNativeVoronoiContainer extends base {
    // assign native specific defaultProps over web `VictoryVoronoiContainer` defaultProps
    static defaultProps = {
      ...VictoryVoronoiContainer.defaultProps,
      activateData: true,
      activateLabels: true,
      labelComponent: <VictoryTooltip />,
      voronoiPadding: 5,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props) => {
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

const combinedMixin = flow(originalVoronoiMixin, nativeVoronoiMixin);

export const voronoiContainerMixin = (base) => combinedMixin(base);

export default voronoiContainerMixin(VictoryContainer);

import {
  VictoryZoomContainer,
  useVictoryZoomContainer,
} from "victory-zoom-container";
import {
  VictorySelectionContainer,
  useVictorySelectionContainer,
} from "victory-selection-container";
import React from "react";
import { VictoryContainer } from "victory-core";
import { forOwn, groupBy, isEmpty, toPairs } from "lodash";
import {
  VictoryVoronoiContainer,
  useVictoryVoronoiContainer,
} from "victory-voronoi-container";
import {
  VictoryCursorContainer,
  useVictoryCursorContainer,
} from "victory-cursor-container";
import {
  VictoryBrushContainer,
  useVictoryBrushContainer,
} from "victory-brush-container";

function ensureArray<T>(thing: T): [] | T | T[] {
  if (!thing) {
    return [];
  } else if (!Array.isArray(thing)) {
    return [thing];
  }
  return thing;
}

const combineEventHandlers = (eventHandlersArray: any[]) => {
  // takes an array of event handler objects and produces one eventHandlers object
  // creates a custom combinedHandler() for events with multiple conflicting handlers
  return eventHandlersArray.reduce((localHandlers, finalHandlers) => {
    forOwn(localHandlers, (localHandler, eventName) => {
      const existingHandler = finalHandlers[eventName];
      if (existingHandler) {
        // create new handler for event that concats the existing handler's mutations with new ones
        finalHandlers[eventName] = function combinedHandler(...params) {
          // named for debug clarity
          // sometimes handlers return undefined; use empty array instead, for concat()
          const existingMutations = ensureArray(existingHandler(...params));
          const localMutations = ensureArray(localHandler(...params));
          return existingMutations.concat(localMutations);
        };
      } else {
        finalHandlers[eventName] = localHandler;
      }
    });
    return finalHandlers;
  });
};

const combineDefaultEvents = (defaultEvents: any[]) => {
  // takes a defaultEvents array and returns one equal or lesser length,
  // by combining any events that have the same target
  const eventsByTarget = groupBy(defaultEvents, "target");
  const events = toPairs(eventsByTarget).map(([target, eventsArray]) => {
    const newEventsArray = eventsArray.filter(Boolean);
    return isEmpty(newEventsArray)
      ? null
      : {
          target,
          eventHandlers: combineEventHandlers(
            eventsArray.map((event) => event.eventHandlers),
          ),
          // note: does not currently handle eventKey or childName
        };
  });
  return events.filter(Boolean);
};

const CONTAINERS = {
  zoom: {
    name: "Zoom",
    component: VictoryZoomContainer,
    hook: useVictoryZoomContainer,
  },
  selection: {
    name: "Selection",
    component: VictorySelectionContainer,
    hook: useVictorySelectionContainer,
  },
  brush: {
    name: "Brush",
    component: VictoryBrushContainer,
    hook: useVictoryBrushContainer,
  },
  cursor: {
    name: "Cursor",
    component: VictoryCursorContainer,
    hook: useVictoryCursorContainer,
  },
  voronoi: {
    name: "Voronoi",
    component: VictoryVoronoiContainer,
    hook: useVictoryVoronoiContainer,
  },
};

export type ContainerType = keyof typeof CONTAINERS;

type ContainerProps<T extends ContainerType> = React.ComponentProps<
  typeof CONTAINERS[T]["component"]
>;

export function createContainer<
  TContainerAType extends ContainerType,
  TContainerBType extends ContainerType,
>(containerA: TContainerAType, containerB: TContainerBType) {
  const {
    name: containerAName,
    component: ContainerA,
    hook: useContainerA,
  } = CONTAINERS[containerA];
  const {
    name: containerBName,
    component: ContainerB,
    hook: useContainerB,
  } = CONTAINERS[containerB];

  const Container = (
    props: ContainerProps<TContainerAType> & ContainerProps<TContainerBType>,
  ) => {
    const { children: childrenA, props: propsA } = useContainerA(props);
    const { children: childrenB, props: propsB } = useContainerB({
      ...propsA,
      children: childrenA,
    });

    return <VictoryContainer {...propsB}>{childrenB}</VictoryContainer>;
  };

  Container.displayName = `Victory${containerAName}${containerBName}Container`;
  Container.role = "container";
  Container.defaultEvents = (
    props: ContainerProps<TContainerAType> & ContainerProps<TContainerBType>,
  ) =>
    combineDefaultEvents([
      ...ContainerA.defaultEvents(props),
      ...ContainerB.defaultEvents(props),
    ]);

  return Container;
}

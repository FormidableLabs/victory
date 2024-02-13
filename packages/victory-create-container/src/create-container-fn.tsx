import {
  VictoryZoomContainerFn,
  useVictoryZoomContainer,
} from "victory-zoom-container";
import {
  VictorySelectionContainerFn,
  useVictorySelectionContainer,
} from "victory-selection-container";
import React from "react";
import { VictoryContainerFn } from "victory-core";
import { forOwn, groupBy, isEmpty, toPairs } from "lodash";
import {
  VictoryVoronoiContainerFn,
  useVictoryVoronoiContainer,
} from "victory-voronoi-container";
import {
  VictoryCursorContainerFn,
  useVictoryCursorContainer,
} from "victory-cursor-container";

export type ContainerType =
  | "brush"
  | "cursor"
  | "selection"
  | "voronoi"
  | "zoom";

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

type Container = {
  name: string;
  component: React.FC<any>;
  hook: (props: any) => {
    props: any;
    children: React.ReactNode;
  };
};

// TODO: Add correct components & hooks when they are built
const CONTAINERS: Record<ContainerType, Container> = {
  zoom: {
    name: "Zoom",
    component: VictoryZoomContainerFn,
    hook: useVictoryZoomContainer,
  },
  selection: {
    name: "Selection",
    component: VictorySelectionContainerFn,
    hook: useVictorySelectionContainer,
  },
  brush: {
    name: "Brush",
    component: VictoryZoomContainerFn,
    hook: useVictoryZoomContainer,
  },
  cursor: {
    name: "Cursor",
    component: VictoryCursorContainerFn,
    hook: useVictoryCursorContainer,
  },
  voronoi: {
    name: "Voronoi",
    component: VictoryVoronoiContainerFn,
    hook: useVictoryVoronoiContainer,
  },
};

// TODO: Type this function properly
export function createContainerFn(
  containerA: ContainerType,
  containerB: ContainerType,
) {
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

  function NewContainer(props: any) {
    const { children: childrenA, props: propsA } = useContainerA(props);
    const { children: childrenB, props: propsB } = useContainerB({
      ...propsA,
      children: childrenA,
    });

    return <VictoryContainerFn {...propsB}>{childrenB}</VictoryContainerFn>;
  }

  NewContainer.displayName = `Victory${containerAName}${containerBName}Container`;
  NewContainer.role = "container";
  NewContainer.defaultEvents = (props: any) =>
    combineDefaultEvents([
      ...ContainerA.defaultEvents(props),
      ...ContainerB.defaultEvents(props),
    ]);

  return NewContainer;
}

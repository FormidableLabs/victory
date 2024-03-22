import React from "react";
import { toPairs, groupBy, forOwn, flow, isEmpty } from "lodash";
import { Helpers, VictoryContainer, Log } from "victory-core";
import { voronoiContainerMixin } from "victory-voronoi-container";
import { zoomContainerMixin } from "victory-zoom-container";
import { selectionContainerMixin } from "victory-selection-container";
import { brushContainerMixin } from "victory-brush-container";
import { cursorContainerMixin } from "victory-cursor-container";

export type ContainerType =
  | "brush"
  | "cursor"
  | "selection"
  | "voronoi"
  | "zoom";

type MixinFunction = (...args: any[]) => any;

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

export const combineContainerMixins = (
  mixins: MixinFunction[],
  Container: React.ComponentType<any>,
) => {
  // similar to Object.assign(A, B), this function will decide conflicts in favor mixinB.
  // this applies to propTypes and defaultProps.
  // getChildren will call A's getChildren() and pass the resulting children to B's.
  // defaultEvents attempts to resolve any conflicts between A and B's defaultEvents.
  const Classes = mixins.map((mixin) => mixin(Container));
  const instances = Classes.map((Class) => new Class());
  const NaiveCombinedContainer = flow(mixins)(Container);

  const displayType = Classes.map((Class) => {
    const match = Class.displayName.match(/Victory(.*)Container/);
    return match[1] || "";
  }).join("");

  return class VictoryCombinedContainer extends NaiveCombinedContainer {
    static displayName = `Victory${displayType}Container`;

    static propTypes = Classes.reduce(
      (propTypes, Class) => ({ ...propTypes, ...Class.propTypes }),
      {},
    );

    static defaultProps = Classes.reduce(
      (defaultProps, Class) => ({ ...defaultProps, ...Class.defaultProps }),
      {},
    );

    static defaultEvents(props) {
      return combineDefaultEvents(
        Classes.reduce((defaultEvents, Class) => {
          const events = Helpers.isFunction(Class.defaultEvents)
            ? Class.defaultEvents(props)
            : Class.defaultEvents;
          return [...defaultEvents, ...events];
        }, []),
      );
    }

    getChildren(props) {
      return instances.reduce(
        (children, instance) => instance.getChildren({ ...props, children }),
        props.children,
      );
    }
  };
};

const checkBehaviorName = (
  behavior: ContainerType,
  behaviors: ContainerType[],
) => {
  if (behavior && !behaviors.includes(behavior)) {
    Log.warn(
      `"${behavior}" is not a valid behavior. Choose from [${behaviors.join(
        ", ",
      )}].`,
    );
  }
};

export const makeCreateContainerFunction =
  (
    mixinMap: Record<ContainerType, MixinFunction[]>,
    Container: React.ComponentType<any>,
  ) =>
  (
    behaviorA: ContainerType,
    behaviorB: ContainerType,
    ...invalid: ContainerType[]
  ) => {
    const behaviors = Object.keys(mixinMap) as ContainerType[];

    checkBehaviorName(behaviorA, behaviors);
    checkBehaviorName(behaviorB, behaviors);

    if (invalid.length) {
      Log.warn(
        "too many arguments given to createContainer (maximum accepted: 2).",
      );
    }

    const firstMixins = mixinMap[behaviorA];
    const secondMixins = mixinMap[behaviorB] || [];

    if (!firstMixins) {
      return Container;
    }

    return combineContainerMixins([...firstMixins, ...secondMixins], Container);
  };

export const createContainer = makeCreateContainerFunction(
  {
    zoom: [zoomContainerMixin],
    voronoi: [voronoiContainerMixin],
    selection: [selectionContainerMixin],
    cursor: [cursorContainerMixin],
    brush: [brushContainerMixin],
  },
  VictoryContainer,
);

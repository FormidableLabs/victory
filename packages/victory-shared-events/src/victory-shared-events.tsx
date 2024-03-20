import { defaults, isEmpty, fromPairs } from "lodash";
import React from "react";
import {
  Collection,
  EventCallbackInterface,
  EventMixinCalculatedValues,
  EventPropTypeInterface,
  Events,
  Helpers,
  StringOrNumberOrCallback,
  TimerContext,
} from "victory-core";
import isEqual from "react-fast-compare";
import stringify from "json-stringify-safe";

export type VictorySharedEventsProps = {
  children?: React.ReactElement | React.ReactElement[];
  container?: React.ReactElement;
  groupComponent?: React.ReactElement;
  events?: EventPropTypeInterface<string, StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  externalEventMutations?: EventCallbackInterface<
    string | string[],
    string | number | (string | number)[]
  >[];
};

// DISCLAIMER:
// This file is not currently tested, and it is first on the list of files
// to refactor in our current refactoring effort. Please do not make changes
// to this file without manual testing and/or refactoring and adding tests.

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VictorySharedEvents extends EventMixinCalculatedValues {}

export class VictorySharedEvents extends React.Component<VictorySharedEventsProps> {
  static displayName = "VictorySharedEvents";
  static role = "shared-event-wrapper";
  static contextType = TimerContext;
  static defaultProps = {
    groupComponent: <g />,
  };

  getScopedEvents;
  getEventState;
  baseProps;
  sharedEventsCache;
  globalEvents;
  prevGlobalEventKeys;
  boundGlobalEvents;

  constructor(props: VictorySharedEventsProps) {
    super(props);

    this.getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
    this.state = this.state || {};
    this.sharedEventsCache = {};
    this.globalEvents = {};
    this.prevGlobalEventKeys = [];
    this.boundGlobalEvents = {};
    this.baseProps = this.getBaseProps(props);
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.baseProps = this.getBaseProps(nextProps);
      const externalMutations = this.getExternalMutations(
        nextProps,
        this.baseProps,
      );
      this.applyExternalMutations(nextProps, externalMutations);
    }
    return true;
  }

  componentDidMount() {
    const globalEventKeys = Object.keys(this.globalEvents);
    globalEventKeys.forEach((key) => this.addGlobalListener(key));
    this.prevGlobalEventKeys = globalEventKeys;
  }

  componentDidUpdate() {
    const globalEventKeys = Object.keys(this.globalEvents);
    const removedGlobalEventKeys = Collection.difference(
      this.prevGlobalEventKeys,
      globalEventKeys,
    );
    removedGlobalEventKeys.forEach((key) => this.removeGlobalListener(key));
    const addedGlobalEventKeys = Collection.difference(
      globalEventKeys,
      this.prevGlobalEventKeys,
    );
    addedGlobalEventKeys.forEach((key) => this.addGlobalListener(key));
    this.prevGlobalEventKeys = globalEventKeys;
  }

  componentWillUnmount() {
    this.prevGlobalEventKeys.forEach((key) => this.removeGlobalListener(key));
  }

  addGlobalListener(key) {
    const boundListener = (event) => {
      const listener = this.globalEvents[key];
      return listener && listener(Events.emulateReactEvent(event));
    };
    this.boundGlobalEvents[key] = boundListener;
    window.addEventListener(
      Events.getGlobalEventNameFromKey(key),
      boundListener,
    );
  }

  removeGlobalListener(key) {
    window.removeEventListener(
      Events.getGlobalEventNameFromKey(key),
      this.boundGlobalEvents[key],
    );
  }

  getAllEvents(props) {
    const components = ["container", "groupComponent"];
    const componentEvents = Events.getComponentEvents(props, components);
    if (Array.isArray(componentEvents)) {
      return Array.isArray(props.events)
        ? componentEvents.concat(...props.events)
        : componentEvents;
    }
    return props.events;
  }

  applyExternalMutations(props, externalMutations) {
    if (!isEmpty(externalMutations)) {
      const callbacks = props.externalEventMutations.reduce(
        (memo, mutation) =>
          Helpers.isFunction(mutation.callback)
            ? memo.concat(mutation.callback)
            : memo,
        [],
      );
      const compiledCallbacks = callbacks.length
        ? () => {
            callbacks.forEach((c) => c());
          }
        : undefined;
      this.setState(externalMutations, compiledCallbacks);
    }
  }

  getExternalMutations(props, baseProps) {
    return !isEmpty(props.externalEventMutations)
      ? Events.getExternalMutationsWithChildren(
          props.externalEventMutations,
          baseProps,
          this.state,
          Object.keys(baseProps),
        )
      : undefined;
  }

  cacheSharedEvents(name, sharedEvents, cacheValues) {
    this.sharedEventsCache[name] = [sharedEvents, cacheValues];
  }

  getCachedSharedEvents(name, cacheValues) {
    const [sharedEvents, prevCacheValues] = this.sharedEventsCache[name] || [];

    if (sharedEvents && isEqual(cacheValues, prevCacheValues)) {
      return sharedEvents;
    }

    return undefined;
  }

  getBaseProps(props) {
    const { container } = props;
    const children = React.Children.toArray(this.props.children);
    const childBaseProps = this.getBasePropsFromChildren(children);
    const parentBaseProps = container ? container.props : {};
    return Object.assign({}, childBaseProps, { parent: parentBaseProps });
  }

  getBasePropsFromChildren(childComponents) {
    const iteratee = (child, childName) => {
      if (child.type && Helpers.isFunction(child.type.getBaseProps)) {
        const baseProps = child.props && child.type.getBaseProps(child.props);
        return baseProps ? [[childName, baseProps]] : null;
      }
      return null;
    };

    const baseProps = Helpers.reduceChildren(childComponents, iteratee);
    return fromPairs(baseProps);
  }

  getNewChildren(props, baseProps) {
    const { events, eventKey } = props;

    const alterChildren = (children, childNames) => {
      return children.reduce((memo, child, index) => {
        if (child.props.children) {
          const newChildren = React.Children.toArray(child.props.children);
          const names = childNames.slice(index, index + newChildren.length);
          const results = React.cloneElement(
            child,
            child.props,
            alterChildren(newChildren, names),
          );
          return memo.concat(results);
        } else if (
          childNames[index] !== "parent" &&
          child.type &&
          Helpers.isFunction(child.type.getBaseProps)
        ) {
          const name = child.props.name || childNames[index];
          const childEvents =
            Array.isArray(events) &&
            events.filter((event) => {
              if (event.target === "parent") {
                return false;
              }
              return Array.isArray(event.childName)
                ? event.childName.indexOf(name) > -1
                : event.childName === name || event.childName === "all";
            });

          const sharedEventsCacheValues = [
            name,
            baseProps,
            childEvents,
            stringify(this.state[name]),
          ];

          const sharedEvents = this.getCachedSharedEvents(
            name,
            sharedEventsCacheValues,
          ) || {
            events: childEvents,
            // partially apply child name and baseProps,
            getEvents: (evts, target) =>
              this.getScopedEvents(evts, target, name, baseProps),
            // partially apply child name
            getEventState: (key, target) =>
              this.getEventState(key, target, name),
          };

          this.cacheSharedEvents(name, sharedEvents, sharedEventsCacheValues);

          return memo.concat(
            React.cloneElement(
              child,
              Object.assign(
                { key: `events-${name}`, sharedEvents, eventKey, name },
                child.props,
              ),
            ),
          );
        }
        return memo.concat(child);
      }, []);
    };
    const childNames = Object.keys(baseProps);
    const childComponents = React.Children.toArray(props.children);
    return alterChildren(childComponents, childNames);
  }

  getContainer(props, baseProps, events) {
    const children = this.getNewChildren(props, baseProps);
    const parents = Array.isArray(events)
      ? events.filter((event) => event.target === "parent")
      : [];

    const sharedEvents =
      parents.length > 0
        ? {
            events: parents,
            // partially apply childName (null) and baseProps,
            getEvents: (evts, target) =>
              this.getScopedEvents(evts, target, null, baseProps),
            getEventState: this.getEventState,
          }
        : null;
    const container = props.container || props.groupComponent;
    const role = container.type && container.type.role;
    const containerProps = container.props || {};
    const boundGetEvents = Events.getEvents.bind(this);
    const parentEvents =
      sharedEvents && boundGetEvents({ sharedEvents }, "parent");
    const parentProps = defaults(
      {},
      this.getEventState("parent", "parent"),
      containerProps,
      baseProps.parent,
      { children },
    );
    const containerEvents = defaults(
      {},
      Events.getPartialEvents(parentEvents, "parent", parentProps),
      containerProps.events,
    );
    this.globalEvents = Events.getGlobalEvents(containerEvents);
    const localEvents = Events.omitGlobalEvents(containerEvents);
    return role === "container"
      ? React.cloneElement(
          container,
          Object.assign({}, parentProps, { events: localEvents }),
        )
      : React.cloneElement(container, localEvents, children);
  }

  render(): React.ReactElement {
    const events = this.getAllEvents(this.props);
    if (events) {
      return this.getContainer(this.props, this.baseProps, events);
    }
    return React.cloneElement(this.props.container as React.ReactElement, {
      children: this.props.children,
    });
  }
}

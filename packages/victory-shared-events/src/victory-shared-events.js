/*global window:false */
import {
  assign,
  isFunction,
  defaults,
  isEmpty,
  fromPairs,
  keys,
  difference
} from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {
  PropTypes as CustomPropTypes,
  Events,
  Helpers,
  TimerContext
} from "victory-core";
import isEqual from "react-fast-compare";
import stringify from "json-stringify-safe";

export default class VictorySharedEvents extends React.Component {
  static displayName = "VictorySharedEvents";

  static role = "shared-event-wrapper";

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    container: PropTypes.node,
    eventKey: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative
      ]),
      PropTypes.string
    ]),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        eventHandlers: PropTypes.object,
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.func,
          CustomPropTypes.allOfType([
            CustomPropTypes.integer,
            CustomPropTypes.nonNegative
          ]),
          PropTypes.string
        ]),
        target: PropTypes.string
      })
    ),
    externalEventMutations: PropTypes.arrayOf(
      PropTypes.shape({
        callback: PropTypes.function,
        childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([
            CustomPropTypes.integer,
            CustomPropTypes.nonNegative
          ]),
          PropTypes.string
        ]),
        mutation: PropTypes.function,
        target: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
      })
    ),
    groupComponent: PropTypes.node
  };

  static defaultProps = {
    groupComponent: <g />
  };

  static contextType = TimerContext;

  constructor(props) {
    super(props);
    this.state = this.state || {};
    this.getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
    this.baseProps = this.getBaseProps(props);
    this.sharedEventsCache = {};
    this.globalEvents = {};
    this.prevGlobalEventKeys = [];
    this.boundGlobalEvents = {};
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.baseProps = this.getBaseProps(nextProps);
      const externalMutations = this.getExternalMutations(
        nextProps,
        this.baseProps
      );
      this.applyExternalMutations(nextProps, externalMutations);
    }
    return true;
  }

  componentDidMount() {
    const globalEventKeys = keys(this.globalEvents);
    globalEventKeys.forEach((key) => this.addGlobalListener(key));
    this.prevGlobalEventKeys = globalEventKeys;
  }

  componentDidUpdate() {
    const globalEventKeys = keys(this.globalEvents);
    const removedGlobalEventKeys = difference(
      this.prevGlobalEventKeys,
      globalEventKeys
    );
    removedGlobalEventKeys.forEach((key) => this.removeGlobalListener(key));
    const addedGlobalEventKeys = difference(
      globalEventKeys,
      this.prevGlobalEventKeys
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
      boundListener
    );
  }

  removeGlobalListener(key) {
    window.removeEventListener(
      Events.getGlobalEventNameFromKey(key),
      this.boundGlobalEvents[key]
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
        (memo, mutation) => {
          memo = isFunction(mutation.callback)
            ? memo.concat(mutation.callback)
            : memo;
          return memo;
        },
        []
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
          keys(baseProps)
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
    return assign({}, childBaseProps, { parent: parentBaseProps });
  }

  getBasePropsFromChildren(childComponents) {
    const iteratee = (child, childName) => {
      if (child.type && isFunction(child.type.getBaseProps)) {
        const baseProps = child.props && child.type.getBaseProps(child.props);
        return baseProps ? [[childName, baseProps]] : null;
      } else {
        return null;
      }
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
            alterChildren(newChildren, names)
          );
          return memo.concat(results);
        } else if (
          childNames[index] !== "parent" &&
          child.type &&
          isFunction(child.type.getBaseProps)
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
            stringify(this.state[name])
          ];

          const sharedEvents = this.getCachedSharedEvents(
            name,
            sharedEventsCacheValues
          ) || {
            events: childEvents,
            // partially apply child name and baseProps,
            getEvents: (evts, target) =>
              this.getScopedEvents(evts, target, name, baseProps),
            // partially apply child name
            getEventState: (key, target) =>
              this.getEventState(key, target, name)
          };

          this.cacheSharedEvents(name, sharedEvents, sharedEventsCacheValues);

          return memo.concat(
            React.cloneElement(
              child,
              assign(
                { key: `events-${name}`, sharedEvents, eventKey, name },
                child.props
              )
            )
          );
        } else {
          return memo.concat(child);
        }
      }, []);
    };
    const childNames = keys(baseProps);
    const childComponents = React.Children.toArray(props.children);
    return alterChildren(childComponents, childNames);
  }

  getContainer(props, baseProps, events) {
    const children = this.getNewChildren(props, baseProps);
    const parents =
      Array.isArray(events) &&
      events.filter((event) => event.target === "parent");

    const sharedEvents =
      parents.length > 0
        ? {
            events: parents,
            // partially apply childName (null) and baseProps,
            getEvents: (evts, target) =>
              this.getScopedEvents(evts, target, null, baseProps),
            getEventState: this.getEventState
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
      { children }
    );
    const containerEvents = defaults(
      {},
      Events.getPartialEvents(parentEvents, "parent", parentProps),
      containerProps.events
    );
    this.globalEvents = Events.getGlobalEvents(containerEvents);
    const localEvents = Events.omitGlobalEvents(containerEvents);
    return role === "container"
      ? React.cloneElement(
          container,
          assign({}, parentProps, { events: localEvents })
        )
      : React.cloneElement(container, localEvents, children);
  }

  render() {
    const events = this.getAllEvents(this.props);
    if (events) {
      return this.getContainer(this.props, this.baseProps, events);
    }
    return React.cloneElement(this.props.container, {
      children: this.props.children
    });
  }
}

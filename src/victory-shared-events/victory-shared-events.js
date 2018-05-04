import { assign, isFunction, defaults, isEmpty, fromPairs } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import Events from "../victory-util/events";
import Helpers from "../victory-util/helpers";
import Timer from "../victory-util/timer";


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
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      childName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      eventHandlers: PropTypes.object,
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      target: PropTypes.string
    })),
    externalEventMutations: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.function,
      childName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      mutation: PropTypes.function,
      target: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ])
    })),
    groupComponent: PropTypes.node
  };

  static defaultProps = {
    groupComponent: <g/>
  };

  static contextTypes = {
    getTimer: PropTypes.func
  };

  static childContextTypes = {
    getTimer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = this.state || {};
    this.getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.baseProps = this.getBaseProps(props);
  }

  getChildContext() {
    return {
      getTimer: this.getTimer
    };
  }

  componentWillReceiveProps(newProps) {
    this.baseProps = this.getBaseProps(newProps);
    const externalMutations = this.getExternalMutations(newProps, this.baseProps);
    this.applyExternalMutations(newProps, externalMutations);
  }


  getTimer() {
    if (this.context.getTimer) {
      return this.context.getTimer();
    }
    if (!this.timer) {
      this.timer = new Timer();
    }
    return this.timer;
  }

  getAllEvents(props) {
    const components = ["container", "groupComponent"];
    const componentEvents = Events.getComponentEvents(props, components);
    if (Array.isArray(componentEvents)) {
      return Array.isArray(props.events) ?
        componentEvents.concat(...props.events) : componentEvents;
    }
    return props.events;
  }

  applyExternalMutations(props, externalMutations) {
    if (!isEmpty(externalMutations)) {
      const callbacks = props.externalEventMutations.reduce((memo, mutation) => {
        memo = isFunction(mutation.callback) ? memo.concat(mutation.callback) : memo;
        return memo;
      }, []);
      const compiledCallbacks = callbacks.length ?
        () => { callbacks.forEach((c) => c()); } : undefined;
      this.setState(externalMutations, compiledCallbacks);
    }
  }

  getExternalMutations(props, baseProps) {
    return !isEmpty(props.externalEventMutations) ?
      Events.getExternalMutationsWithChildren(
        props.externalEventMutations, baseProps, this.state, Object.keys(baseProps)
      ) :
      undefined;
  }

  getBaseProps(props) {
    const { container } = props;
    const children = React.Children.toArray(this.props.children);
    const childBaseProps = this.getBasePropsFromChildren(children);
    const parentBaseProps = container ? container.props : {};
    return assign({}, childBaseProps, { parent: parentBaseProps });
  }

  getBasePropsFromChildren(childComponents) {
    const iteratee = (child, childName, parent) => {
      if (child.type && isFunction(child.type.getBaseProps)) {
        child = parent ? React.cloneElement(child, parent.props) : child;
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
    const childNames = Object.keys(baseProps);
    const alterChildren = (children) => {
      return children.reduce((memo, child, index) => {
        if (child.props.children) {
          return memo.concat(React.cloneElement(
            child,
            child.props,
            alterChildren(React.Children.toArray(child.props.children))
          ));
        } else if (child.type && isFunction(child.type.getBaseProps)) {
          const name = child.props.name || childNames.shift() || index;
          const childEvents = Array.isArray(events) &&
            events.filter((event) => {
              if (event.target === "parent") {
                return false;
              }
              return Array.isArray(event.childName) ?
                event.childName.indexOf(name) > -1 :
                event.childName === name || event.childName === "all";
            });
          const sharedEvents = {
            events: childEvents,
            // partially apply child name and baseProps,
            getEvents: (evts, target) => this.getScopedEvents(evts, target, name, baseProps),
            // partially apply child name
            getEventState: (key, target) => this.getEventState(key, target, name)
          };
          return memo.concat(React.cloneElement(child, assign(
            { key: `events-${name}`, sharedEvents, eventKey, name },
            child.props
          )));
        } else {
          return memo.concat(child);
        }
      }, []);
    };
    const childComponents = React.Children.toArray(props.children);
    return alterChildren(childComponents);
  }

  getContainer(props, baseProps, events) {
    const children = this.getNewChildren(props, baseProps);
    const parents = Array.isArray(events) &&
      events.filter((event) => event.target === "parent");
    const sharedEvents = parents.length > 0 ?
    {
      events: parents,
      // partially apply childName (null) and baseProps,
      getEvents: (evts, target) => this.getScopedEvents(evts, target, null, baseProps),
      getEventState: this.getEventState
    } : null;
    const container = props.container || props.groupComponent;
    const role = container.type && container.type.role;
    const containerProps = container.props || {};
    const boundGetEvents = Events.getEvents.bind(this);
    const parentEvents = sharedEvents && boundGetEvents({ sharedEvents }, "parent");
    const parentProps = defaults(
      {},
      this.getEventState("parent", "parent"),
      containerProps,
      baseProps.parent,
      { children }
    );
    const containerEvents = defaults(
      {}, Events.getPartialEvents(parentEvents, "parent", parentProps), containerProps.events
    );
    return role === "container" ?
      React.cloneElement(container, assign({}, parentProps, { events: containerEvents })) :
      React.cloneElement(container, containerEvents, children);
  }

  render() {
    const events = this.getAllEvents(this.props);
    if (events) {
      return this.getContainer(this.props, this.baseProps, events);
    }
    return React.cloneElement(this.props.container, { children: this.props.children });
  }
}

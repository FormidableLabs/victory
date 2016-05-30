import { extend, merge, partial, isFunction, isEmpty, property } from "lodash";

export default {
  getPartialEvents(events, eventKey, childProps) {
    return events ?
      Object.keys(events).reduce((memo, eventName) => {
        /* eslint max-params: 0 */
        memo[eventName] = partial(
          events[eventName],
          partial.placeholder, // evt will still be the first argument for event handlers
          childProps, // event handlers will have access to data component props, including data
          eventKey, // used in setting a unique state property
          eventName // used in setting a unique state property
        );
        return memo;
      }, {}) :
      {};
  },

  /*
  [
    {
      target: "data",
      eventKey: 1,
      mutation: (stateForParticularTarget) => {
        return whatever
      }
    },
    {
      target: "labels",
      eventKey: 2,
      text: "hello"
    }
  ]
  */


  getEvents(events, namespace, childType, baseProps) {
    baseProps = baseProps || this.baseProps;
    const getTargetProps = (childName, key, type) => {
      if (!childName || !baseProps[childName]) {
        return baseProps[key] && baseProps[key][type];
      }
      return baseProps[childName] &&
        baseProps[childName][key] &&
        baseProps[childName][key][type];
    };

    const parseEvent = (eventReturn, eventKey) => {
      const nullFunction = () => null;
      const key = eventReturn.eventKey || eventKey;
      const type = eventReturn.type || namespace;
      const childName = eventReturn.childName || childType;
      const targetProps = getTargetProps(childName, key, type);
      const mutation = eventReturn.mutation || nullFunction;
      const mutatedProps = mutation(targetProps, baseProps);
      const childState = this.state[childName] || {};
      return childName ?
        extend(this.state, {
          [childName]: extend(childState, {
            [key]: extend(childState[key], {[type]: mutatedProps})
          })
        }) :
        extend(this.state, {
          [key]: extend(this.state[key], {[type]: mutatedProps})
        });
    };

    const parseEventReturn = (eventReturn, eventKey) => {
      return Array.isArray(eventReturn) ?
        eventReturn.reduce((memo, props) => {
          memo = merge({}, memo, parseEvent(props, eventKey));
          return memo;
        }, {}) :
        parseEvent(eventReturn, eventKey);
    };

    const onEvent = (evt, childProps, eventKey, eventName) => {
      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        const eventReturn = this.props.events[namespace][eventName](evt, childProps, eventKey);
        this.setState(parseEventReturn(eventReturn, eventKey));
      }
    };

    return !isEmpty(events) ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  },

  getEventState(eventKey, namespace, childType) {
    if (!childType) {
      return this.state[eventKey] && this.state[eventKey][namespace];
    }
    return this.state[childType] &&
      this.state[childType][eventKey] &&
      this.state[childType][eventKey][namespace];
  },

  getEventKey(key) {
    // creates a data accessor function
    // given a property key, path, array index, or null for identity.
    if (isFunction(key)) {
      return key;
    } else if (key === null || typeof key === "undefined") {
      return () => undefined;
    }
    // otherwise, assume it is an array index, property key or path (_.property handles all three)
    return property(key);
  }
};

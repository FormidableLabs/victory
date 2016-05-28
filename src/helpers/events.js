import { defaults, merge, partial, isFunction, property } from "lodash";

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

  getEvents(events, namespace) {
    const parseEvent = (eventReturn, childProps, eventKey) => {
      const key = eventReturn.eventKey || eventKey;
      const target = eventReturn.target || namespace;
      const propKeys = Object.keys(eventReturn).filter(
        (prop) => prop !== "target" && prop !== "eventKey"
      );
      const mergedProps = propKeys.reduce((memo, propKey) => {
        memo[propKey] = defaults({}, eventReturn[propKey], childProps[propKey]);
        return memo;
      }, {});
      return {[key]: {[target]: mergedProps}};
    };
    const parseEventReturn = (eventReturn, childProps, eventKey) => {
      return Array.isArray(eventReturn) ?
        eventReturn.reduce((memo, props) => {
          memo = merge({}, memo, parseEvent(props, childProps, eventKey));
          return memo;
        }, {}) :
        parseEvent(eventReturn, childProps, eventKey);
    };
    const onEvent = (evt, childProps, eventKey, eventName) => {

      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        const eventReturn = this.props.events[namespace][eventName](evt, childProps, eventKey);
        console.log(parseEventReturn(eventReturn, childProps, eventKey));
        this.setState({
          [eventKey]: merge(
            {},
            this.state[eventKey],
            this.props.events[namespace][eventName](evt, childProps, eventKey)
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  },

  getEventState(eventKey, namespace) {
    return this.state[eventKey] && this.state[eventKey][namespace];
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

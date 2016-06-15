import { extend, intersection, merge, partial, isFunction, isEmpty, property } from "lodash";

  /* Example Event Prop
    [
      {
        childName: "firstBar",
        target: "data",
        eventKey: 1,
        eventKey: "thisOne",
        eventHandlers: {
          onClick: () => {},
          ...
        }
      },
      {
        target: "labels",
        eventHandlers: {
          onClick: () => {}
        }
      }
    ]


  */

  /* Example Event handler return
  [
    {
      childName: "fistBar",
      target: "data",
      eventKey: 1,
      mutation: (propsForTarget) => {
        return {style: merge({}, propsForTarget.style, {fill: "red"})}
      }
    },
    {
      target: "labels",
      eventKey: 2,
      mutation: () => { return {text: "hello"}; }
    }
  ]
  */

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

  getScopedEvents(events, namespace, childType, baseProps) {
    baseProps = baseProps || this.baseProps;
    const getTargetProps = (identifier, type) => {
      const { childName, target, key } = identifier;
      const baseType = type === "props" ? baseProps : this.state;
      const base = (!childName || !baseType[childName]) ? baseType : baseType[childName];
      return key === "parent" ? base.parent : base[key] && base[key][target];
    };

    const parseEvent = (eventReturn, eventKey) => {
      const nullFunction = () => null;
      const childName = eventReturn.childName || childType;
      const target = eventReturn.target || namespace;
      const getKey = () => {
        if (target === "parent") {
          return "parent";
        } else if (baseProps.all || baseProps[childName] && baseProps[childName].all) {
          return "all";
        }
        return eventReturn.eventKey || eventKey;
      };
      const key = getKey();
      const targetProps = getTargetProps({childName, key, target}, "props");
      const targetState = getTargetProps({childName, key, target}, "state");
      const mutation = eventReturn.mutation || nullFunction;
      const mutatedProps = mutation(Object.assign({}, targetProps, targetState), baseProps);
      const childState = this.state[childName] || {};
      return childName ?
        extend(this.state, {
          [childName]: extend(childState, {
            [key]: extend(childState[key], {[target]: mutatedProps})
          })
        }) :
        extend(this.state, {
          [key]: extend(this.state[key], {[target]: mutatedProps})
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
      const eventReturn = events[eventName](evt, childProps, eventKey);
      if (eventReturn) {
        this.setState(parseEventReturn(eventReturn, eventKey));
      }
    };

    return !isEmpty(events) ?
      Object.keys(events).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  },

  getEvents(props, target, eventKey, getScopedEvents) {
    const getEventsFromProps = (events) => {
      const getSelectedEvents = () => {
        const findEventsWith = (name, value) => {
          return events.reduce((memo, event) => {
            if (event[name] !== undefined) {
              return `${event[name]}` === `${value}` ? memo.concat(event) : memo;
            }
            return memo.concat(event);
          }, []);
        };
        const keyEvents = findEventsWith("eventKey", eventKey);
        const targetEvents = findEventsWith("target", target);
        if (keyEvents.length && targetEvents.length) {
          return intersection([...keyEvents, ...targetEvents]);
        }
        return [];
      };
      const selectedEvents = getSelectedEvents();
      return Array.isArray(selectedEvents) && selectedEvents.reduce((memo, event) => {
        return event ? Object.assign(memo, event.eventHandlers) : memo;
      }, {});
    };

    const ownEvents = props.events && getScopedEvents(getEventsFromProps(props.events), target);
    if (!props.sharedEvents) {
      return ownEvents;
    }
    const getSharedEvents = props.sharedEvents.getEvents;
    const sharedEvents = props.sharedEvents.events &&
      getSharedEvents(getEventsFromProps(props.sharedEvents.events), target);
    return Object.assign({}, sharedEvents, ownEvents);
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
  },

  addEventKeys(props, data) {
    const eventKeyAccessor = this.getEventKey(props.eventKey);
    return data.map((datum, index) => {
      const eventKey = datum.eventKey || eventKeyAccessor(datum) || index;
      return Object.assign({eventKey}, datum);
    });
  }
};

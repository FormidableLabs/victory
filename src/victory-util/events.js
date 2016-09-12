import { assign, extend, merge, partial, isFunction, isEmpty, property } from "lodash";

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
    if (isEmpty(events)) {
      return {};
    }

    baseProps = baseProps || this.baseProps;
    const getTargetProps = (identifier, type) => {
      const { childName, target, key } = identifier;
      const baseType = type === "props" ? baseProps : this.state;
      const base = (!childName || !baseType[childName]) ? baseType : baseType[childName];
      return key === "parent" ? base.parent : base[key] && base[key][target];
    };

    const parseEvent = (eventReturn, eventKey) => {
      const childNames = namespace === "parent" ?
        eventReturn.childName : eventReturn.childName || childType;
      const target = eventReturn.target || namespace;

      const getKeys = (childName) => {
        if (baseProps.all || baseProps[childName] && baseProps[childName].all) {
          return "all";
        } else if (eventReturn.eventKey === "all") {
          return baseProps[childName] ?
            Object.keys(baseProps[childName]) : Object.keys(baseProps);
        } else if (eventReturn.eventKey === undefined && eventKey === "parent") {
          return baseProps[childName] ?
            Object.keys(baseProps[childName]) : Object.keys(baseProps);
        }
        return eventReturn.eventKey !== undefined ? eventReturn.eventKey : eventKey;
      };

      const getMutationObject = (key, childName) => {
        const nullFunction = () => null;
        const mutationTargetProps = getTargetProps({childName, key, target}, "props");
        const mutationTargetState = getTargetProps({childName, key, target}, "state");
        const mutation = eventReturn.mutation || nullFunction;
        const mutatedProps = mutation(
          assign({}, mutationTargetProps, mutationTargetState), baseProps
        );
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

      const getReturnByChild = (childName) => {
        const mutationKeys = getKeys(childName);
        return Array.isArray(mutationKeys) ?
          mutationKeys.reduce((memo, key) => {
            return assign(memo, getMutationObject(key, childName));
          }, {}) :
          getMutationObject(mutationKeys, childName);
      };

      return Array.isArray(childNames) ? childNames.reduce((memo, childName) => {
        return assign(memo, getReturnByChild(childName));
      }, {}) : getReturnByChild(childNames);
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

    return Object.keys(events).reduce((memo, event) => {
      memo[event] = onEvent;
      return memo;
    }, {});
  },

  getEvents(props, target, eventKey, getScopedEvents) {
    const getEventsFromProps = (events) => {

      const getSelectedEvents = () => {
        const targetEvents = events.reduce((memo, event) => {
          if (event.target !== undefined) {
            return `${event.target}` === `${target}` ? memo.concat(event) : memo;
          }
          return memo.concat(event);
        }, []);

        if (eventKey !== undefined && target !== "parent") {
          return targetEvents.filter((obj) => {
            const targetKeys = obj.eventKey;
            const useKey = (key) => key ? `${key}` === `${eventKey}` : true;
            return Array.isArray(targetKeys) ?
              targetKeys.some((k) => useKey(k)) : useKey(targetKeys);
          });
        }
        return targetEvents;
      };

      const selectedEvents = getSelectedEvents();
      return Array.isArray(selectedEvents) && selectedEvents.reduce((memo, event) => {
        return event ? assign(memo, event.eventHandlers) : memo;
      }, {});
    };

    const getAllEvents = () => {
      if (Array.isArray(this.componentEvents)) {
        return Array.isArray(props.events) ?
          this.componentEvents.concat(...props.events) : this.componentEvents;
      }
      return props.events;
    };

    const allEvents = getAllEvents();
    const ownEvents = allEvents && getScopedEvents(getEventsFromProps(allEvents), target);
    if (!props.sharedEvents) {
      return ownEvents;
    }
    const getSharedEvents = props.sharedEvents.getEvents;
    const sharedEvents = props.sharedEvents.events &&
      getSharedEvents(getEventsFromProps(props.sharedEvents.events), target);
    return assign({}, sharedEvents, ownEvents);
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
      return assign({eventKey}, datum);
    });
  },

  getComponentEvents(props, components) {
    const events = Array.isArray(components) && components.reduce((memo, componentName) => {
      const component = props[componentName];
      const componentEvents = component && component.type && component.type.defaultEvents;
      memo = Array.isArray(componentEvents) ? memo.concat(...componentEvents) : memo;
      return memo;
    }, []);
    return events && events.length ? events : undefined;
  }
};

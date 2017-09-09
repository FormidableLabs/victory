import { assign, extend, merge, partial, isEmpty, isFunction, without } from "lodash";

export default {
  /* Returns all own and shared events that should be attached to a single target element,
   * i.e. an individual bar specified by target: "data", eventKey: [index].
   * Returned events are scoped to the appropriate state. Either that of the component itself
   * (i.e. VictoryBar) in the case of own events, or that of the parent component
   * (i.e. VictoryChart) in the case of shared events
   */
  getEvents(props, target, eventKey, getScopedEvents) {
    // Returns all events that apply to a particular target element
    const getEventsByTarget = (events) => {
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

    /* Returns all events from props and defaultEvents from components. Events handlers
     * specified in props will override handlers for the same event if they are also
     * specified in defaultEvents of a sub-component
     */
    const getAllEvents = () => {
      if (Array.isArray(this.componentEvents)) {
        return Array.isArray(props.events) ?
          this.componentEvents.concat(...props.events) : this.componentEvents;
      }
      return props.events;
    };

    const allEvents = getAllEvents();
    const ownEvents = allEvents && isFunction(getScopedEvents) ?
      getScopedEvents(getEventsByTarget(allEvents), target) : undefined;
    if (!props.sharedEvents) {
      return ownEvents;
    }
    const getSharedEvents = props.sharedEvents.getEvents;
    const sharedEvents = props.sharedEvents.events &&
      getSharedEvents(getEventsByTarget(props.sharedEvents.events), target);
    return assign({}, sharedEvents, ownEvents);
  },

  /* Returns a modified events object where each event handler is replaced by a new
   * function that calls the original handler and then calls setState with the return
   * of the original event handler assigned to state property that maps to the target
   * element.
   */
  getScopedEvents(events, namespace, childType, baseProps) {
    if (isEmpty(events)) {
      return {};
    }

    baseProps = baseProps || this.baseProps;
    // returns the original base props or base state of a given target element
    const getTargetProps = (identifier, type) => {
      const { childName, target, key } = identifier;
      const baseType = type === "props" ? baseProps : this.state || {};
      const base = (childName === undefined || childName === null || !baseType[childName]) ?
        baseType : baseType[childName];
      return key === "parent" ? base.parent : base[key] && base[key][target];
    };

    // Returns the state object with the mutation caused by a given eventReturn
    // applied to the appropriate property on the state object
    const parseEvent = (eventReturn, eventKey) => {
      const childNames = namespace === "parent" ?
        eventReturn.childName : eventReturn.childName || childType;
      const target = eventReturn.target || namespace;

      // returns all eventKeys to modify for a targeted childName
      const getKeys = (childName) => {
        if (eventReturn.eventKey === "all") {
          return baseProps[childName] ?
            without(Object.keys(baseProps[childName]), "parent") :
            without(Object.keys(baseProps), "parent");
        } else if (eventReturn.eventKey === undefined && eventKey === "parent") {
          return baseProps[childName] ?
            Object.keys(baseProps[childName]) : Object.keys(baseProps);
        }
        return eventReturn.eventKey !== undefined ? eventReturn.eventKey : eventKey;
      };

      // returns the state object with mutated props applied for a single key
      const getMutationObject = (key, childName) => {
        const nullFunction = () => null;
        const mutationTargetProps = getTargetProps({ childName, key, target }, "props");
        const mutationTargetState = getTargetProps({ childName, key, target }, "state");
        const mutation = eventReturn.mutation || nullFunction;
        const mutatedProps = mutation(
          assign({}, mutationTargetProps, mutationTargetState), baseProps
        );
        const baseState = this.state || {};
        const childState = baseState[childName] || {};
        const extendState = (state) => {
          return target === "parent" ?
            extend(state[key], mutatedProps) : extend(state[key], { [target]: mutatedProps });
        };
        return childName !== undefined && childName !== null ?
          extend(baseState, {
            [childName]: extend(childState, { [key]: extendState(childState) })
          }) :
          extend(baseState, { [key]: extendState(baseState) });
      };

      // returns entire mutated state for a given childName
      const getReturnByChild = (childName) => {
        const mutationKeys = getKeys(childName);
        return Array.isArray(mutationKeys) ?
          mutationKeys.reduce((memo, key) => {
            return assign(memo, getMutationObject(key, childName));
          }, {}) :
          getMutationObject(mutationKeys, childName);
      };

      // returns an entire mutated state for all children
      const allChildNames = childNames === "all" ?
        without(Object.keys(baseProps), "parent") : childNames;
      return Array.isArray(allChildNames) ? allChildNames.reduce((memo, childName) => {
        return assign(memo, getReturnByChild(childName));
      }, {}) : getReturnByChild(allChildNames);
    };

    // Parses an array of event returns into a single state mutation
    const parseEventReturn = (eventReturn, eventKey) => {
      return Array.isArray(eventReturn) ?
        eventReturn.reduce((memo, props) => {
          memo = merge({}, memo, parseEvent(props, eventKey));
          return memo;
        }, {}) :
        parseEvent(eventReturn, eventKey);
    };

    const compileCallbacks = (eventReturn) => {
      const getCallback = (obj) => isFunction(obj.callback) && obj.callback;
      const callbacks = Array.isArray(eventReturn) ?
        eventReturn.map((evtObj) => getCallback(evtObj)) : [getCallback(eventReturn)];
      const callbackArray = callbacks.filter((callback) => callback !== false);
      return callbackArray.length ?
        () => callbackArray.forEach((callback) => callback()) : undefined;
    };

    // A function that calls a particular event handler, parses its return
    // into a state mutation, and calls setState
    const onEvent = (evt, childProps, eventKey, eventName) => {
      const eventReturn = events[eventName](evt, childProps, eventKey, this);
      if (eventReturn) {
        const callbacks = compileCallbacks(eventReturn);
        this.setState(parseEventReturn(eventReturn, eventKey), callbacks);
      }
    };

    // returns a new events object with enhanced event handlers
    return Object.keys(events).reduce((memo, event) => {
      memo[event] = onEvent;
      return memo;
    }, {});
  },

  /* Returns a partially applied event handler for a specific target element
   * This allows event handlers to have access to props controlling each element
   */
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

  /* Returns the property of the state object corresponding to event changes for
   * a particular element
   */
  getEventState(eventKey, namespace, childType) {
    const state = this.state || {};
    if (!childType) {
      return eventKey === "parent" ?
        state[eventKey] && state[eventKey][namespace] || state[eventKey] :
        state[eventKey] && state[eventKey][namespace];
    }
    return state[childType] &&
      state[childType][eventKey] &&
      state[childType][eventKey][namespace];

  },

  /* Returns an array of defaultEvents from sub-components of a given component.
   * i.e. any static `defaultEvents` on `labelComponent` will be returned
  */
  getComponentEvents(props, components) {
    const events = Array.isArray(components) && components.reduce((memo, componentName) => {
      const component = props[componentName];
      const defaultEvents = component && component.type && component.type.defaultEvents;
      const componentEvents = isFunction(defaultEvents) ?
        defaultEvents(component.props) : defaultEvents;
      memo = Array.isArray(componentEvents) ? memo.concat(...componentEvents) : memo;
      return memo;
    }, []);
    return events && events.length ? events : undefined;
  }
};

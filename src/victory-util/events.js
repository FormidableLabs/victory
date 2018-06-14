import {
  assign, isEmpty, isFunction, without, pickBy, uniq, includes
} from "lodash";

export default {
  /* Returns all own and shared events that should be attached to a single target element,
   * i.e. an individual bar specified by target: "data", eventKey: [index].
   * Returned events are scoped to the appropriate state. Either that of the component itself
   * (i.e. VictoryBar) in the case of own events, or that of the parent component
   * (i.e. VictoryChart) in the case of shared events
   */
  // eslint-disable-next-line max-params
  getEvents(props, target, eventKey, getScopedEvents) {
    // Returns all events that apply to a particular target element
    const getEventsByTarget = (events) => {
      const getSelectedEvents = () => {
        const targetEvents = events.reduce((memo, event) => {
          if (event.target !== undefined) {
            const matchesTarget = Array.isArray(event.target) ?
              includes(event.target, target) : `${event.target}` === `${target}`;
            return matchesTarget ? memo.concat(event) : memo;
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
  // eslint-disable-next-line max-params
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
        if (target === "parent") {
          return "parent";
        }
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
        const baseState = this.state || {};
        if (!isFunction(eventReturn.mutation)) {
          return baseState;
        }
        const mutationTargetProps = getTargetProps({ childName, key, target }, "props");
        const mutationTargetState = getTargetProps({ childName, key, target }, "state");
        const mutatedProps = eventReturn.mutation(
          assign({}, mutationTargetProps, mutationTargetState), baseProps
        );
        const childState = baseState[childName] || {};

        const filterState = (state) => {
          if (state[key] && state[key][target]) {
            delete state[key][target];
          }
          if (state[key] && !Object.keys(state[key]).length) {
            delete state[key];
          }
          return state;
        };

        const extendState = (state) => {
          return target === "parent" ?
            assign(state, { [key]: assign(state[key], mutatedProps) }) :
            assign(state, { [key]: assign(state[key], { [target]: mutatedProps }) });
        };

        const updateState = (state) => {
          return mutatedProps ? extendState(state) : filterState(state);
        };

        return childName !== undefined && childName !== null ?
          assign(baseState, { [childName]: updateState(childState) }) :
          updateState(baseState);
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
          memo = assign({}, memo, parseEvent(props, eventKey));
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
    // eslint-disable-next-line max-params
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
        const appliedEvent = (evt) => events[eventName](evt, childProps, eventKey, eventName);
        memo[eventName] = appliedEvent;
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

/**
 * Returns a set of all mutations for shared events
 *
 * @param  {Array} mutations an array of mutations objects
 * @param  {Object} baseProps an object that describes all props for children of VictorySharedEvents
 * @param  {Object} baseState an object that describes state for children of VictorySharedEvents
 * @param  {Array} childNames an array of childNames
 *
 * @return {Object} a object describing all mutations for VictorySharedEvents
 */
  // eslint-disable-next-line max-params
  getExternalMutationsWithChildren(mutations, baseProps, baseState, childNames) {
    baseProps = baseProps || {};
    baseState = baseState || {};

    return childNames.reduce((memo, childName) => {
      const childState = baseState[childName];
      const mutation = this.getExternalMutations(
        mutations, baseProps[childName], baseState[childName], childName
      );
      memo[childName] = mutation ? mutation : childState;
      return pickBy(memo, (v) => !isEmpty(v));
    }, {});

  },

/**
 * Returns a set of all mutations for a component
 *
 * @param  {Array} mutations an array of mutations objects
 * @param  {Object} baseProps a props object (scoped to a childName when used by shared events)
 * @param  {Object} baseState a state object (scoped to a childName when used by shared events)
 * @param  {String} childName an optional childName
 *
 * @return {Object} a object describing mutations for a given component
 */
  // eslint-disable-next-line max-params
  getExternalMutations(mutations, baseProps, baseState, childName) {
    baseProps = baseProps || {};
    baseState = baseState || {};

    const eventKeys = Object.keys(baseProps);
    return eventKeys.reduce((memo, eventKey) => {
      const keyState = baseState[eventKey] || {};
      const keyProps = baseProps[eventKey] || {};
      if (eventKey === "parent") {
        const identifier = { eventKey, target: "parent" };
        const mutation = this.getExternalMutation(mutations, keyProps, keyState, identifier);
        memo[eventKey] = mutation !== undefined ?
          assign({}, keyState, mutation) : keyState;
      } else {
        // use keys from both state and props so that elements not intially included in baseProps
        // will be used. (i.e. labels)
        const targets = uniq(Object.keys(keyProps).concat(Object.keys(keyState)));
        memo[eventKey] = targets.reduce((m, target) => {
          const identifier = { eventKey, target, childName };
          const mutation = this.getExternalMutation(
            mutations, keyProps[target], keyState[target], identifier
          );
          m[target] = mutation !== undefined ?
            assign({}, keyState[target], mutation) : keyState[target];
          return pickBy(m, (v) => !isEmpty(v));
        }, {});
      }
      return pickBy(memo, (v) => !isEmpty(v));
    }, {});
  },

/**
 * Returns a set of mutations for a particular element given scoped baseProps and baseState
 *
 * @param  {Array} mutations an array of mutations objects
 * @param  {Object} baseProps a props object (scoped the element specified by the identifier)
 * @param  {Object} baseState a state object (scoped the element specified by the identifier)
 * @param  {Object} identifier { eventKey, target, childName }
 *
 * @return {Object | undefined} a object describing mutations for a given element, or undefined
 */
  // eslint-disable-next-line max-params
  getExternalMutation(mutations, baseProps, baseState, identifier) {

    const filterMutations = (mutation, type) => {
      if (typeof mutation[type] === "string") {
        return mutation[type] === "all" || mutation[type] === identifier[type];
      } else if (Array.isArray(mutation[type])) {
        // coerce arrays to strings before matching
        const stringArray = mutation[type].map((m) => `${m}`);
        return includes(stringArray, identifier[type]);
      } else {
        return false;
      }
    };

    mutations = Array.isArray(mutations) ? mutations : [mutations];
    let scopedMutations = mutations;
    if (identifier.childName) {
      scopedMutations = mutations.filter((m) => filterMutations(m, "childName"));
    }
    // find any mutation objects that match the target
    const targetMutations = scopedMutations.filter((m) => filterMutations(m, "target"));
    if (isEmpty(targetMutations)) {
      return undefined;
    }
    const keyMutations = targetMutations.filter((m) => filterMutations(m, "eventKey"));
    if (isEmpty(keyMutations)) {
      return undefined;
    }
    return keyMutations.reduce((memo, curr) => {
      const mutationFunction = curr && isFunction(curr.mutation) ? curr.mutation : () => undefined;
      const currentMutation = mutationFunction(assign({}, baseProps, baseState));
      return assign({}, memo, currentMutation);
    }, {});
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

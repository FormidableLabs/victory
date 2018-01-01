import {
  assign, extend, merge, partial, isEmpty, isFunction, without, keys, pickBy, defaults, uniq
} from "lodash";

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

  // getExternalMutations(mutations, baseProps, baseState, name) {

  //   baseProps = baseProps || this.baseProps;
  //   baseState = baseState || this.state || {};
  //   const getParentMutation = () => {
  //     const parentMutations = mutations.filter((m) => m.target === "parent");
  //     if (isEmpty(parentMutations)) {
  //       return undefined;
  //     }
  //     return parentMutations.reduce((memo, curr) => {
  //       const mutation = isFunction(curr.mutation) ? curr.mutation : () => null;
  //       const currentProps = merge({}, baseProps.parent, baseState.parent);
  //       const mutatedProps = mutation(currentProps, "parent");
  //       return assign({}, memo, mutatedProps);
  //     }, {});
  //   };
  //   const getMutation = (key, target) => {
  //     const targetMutations = mutations.filter((m) => m.target === target);
  //     if (isEmpty(targetMutations)) {
  //       return undefined;
  //     }
  //     const keyMutations = key === "parent" ?
  //       targetMutations :
  //       targetMutations.filter((m) => m.eventKey === key || m.eventKey === "all");
  //     const currentState = key === "parent" ?
  //       baseState[key] || {} : baseState[key] && baseState[key][target] || {};
  //     const currentProps = key === "parent" ?
  //       baseProps[key] || {} : baseProps[key][target] || {};
  //     return keyMutations.reduce((memo, curr) => {
  //       const mutation = isFunction(curr.mutation) ? curr.mutation : () => null;
  //       const mutatedProps = merge({}, currentProps, currentState);
  //       return assign({}, memo, mutation(mutatedProps));
  //     }, {});
  //   };

  //   return baseProps.keys.reduce((memo, key) => {
  //     if (key === "parent") {
  //       memo[key] = getMutation(key) || baseState.parent;
  //       return memo;
  //     } else {
  //       memo[key] = memo[key].keys.reduce(m, target) => {}
  //     }
  //   }, {});
  // },

  getExternalMutationsWithChildren(mutations, baseProps, baseState, childNames) {
    baseProps = baseProps || this.baseProps;
    baseState = baseState || this.state;

    return childNames.reduce((memo, childName) => {
      const childState = baseState[childName];
      const mutation = this.getExternalMutations(
        mutations, baseProps[childName], baseState[childName], childName
      );
      memo[childName] = mutation ? mutation : childState;
      return memo;
    }, {});

  },

  getExternalMutations(mutations, baseProps, baseState, childName) {
    baseProps = baseProps || {};
    baseState = baseState || {};

    const propKeys = keys(baseProps);
    return propKeys.reduce((memo, key) => {
      const keyState = baseState[key];
      const keyProps = baseProps[key];
      if (key === "parent") {
        const identifier = { key, target: "parent" };
        const mutation = this.getExternalMutation(identifier, mutations, keyState, keyProps);
        memo[key] = typeof mutation !== "undefined" ? mutation : keyState;
      } else {
        const targets = uniq(keys(keyProps).concat(keys(keyState)));
        memo[key] = targets.reduce((m, target) => {
          const identifier = { key, target, childName };
          const targetState = keyState && keyState[target];
          const targetProps = keyProps && keyProps[target];
          const mutation = this.getExternalMutation(identifier, mutations, targetState, targetProps);
          m[target] = typeof mutation !== "undefined" ?
            mutation : targetState;
          // Allow empty objects so that props can be cleared
          return pickBy(m, (v) => typeof v !== "undefined");
        }, {});
      }
      return memo;
      // return pickBy(memo, (v) => typeof v !== "undefined");
    }, {});
  },

  getExternalMutation(identifier, mutations, baseState, baseProps) {
    const { key, target, childName } = identifier;
    mutations = Array.isArray(mutations) ? mutations : [mutations];
    let scopedMutations = mutations;
    if (childName) {
      scopedMutations = mutations.filter((m) => m.childName === childName);
    }
    // find any mutation objects that match the target
    const targetMutations = scopedMutations.filter((m) => m.target === target);
    if (isEmpty(targetMutations)) {
      return undefined;
    }
    const keyMutations = targetMutations.filter((m) => m.eventKey === key || m.eventKey === "all");
    if (isEmpty(keyMutations)) {
      return undefined;
    }

    return keyMutations.reduce((memo, curr) => {
      const currentMutation = curr && curr.mutation(
        assign({}, baseProps, baseState)
      );
      return merge({}, memo, currentMutation);
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

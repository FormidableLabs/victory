/*global window:false */
import React from "react";
import {
  defaults,
  assign,
  keys,
  isFunction,
  pick,
  without,
  isEmpty,
  isNil,
  difference
} from "lodash";
import * as Events from "./events";
import isEqual from "react-fast-compare";
import { VictoryTransition } from "../victory-transition/victory-transition";
import { ComponentWithEvents } from "./events";

// DISCLAIMER:
// This file is not currently tested, and it is first on the list of files
// to refactor in our current refactoring effort. Please do not make changes
// to this file without manual testing and/or refactoring and adding tests.

const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

//  used for checking state changes. Expected components can be passed in via options
const defaultComponents: NonNullable<MixinOptions["components"]> = [
  { name: "parent", index: "parent" },
  { name: "data" },
  { name: "labels" }
];

export type MixinOptions = {
  components?: Array<{
    name: string;
    index?: string;
  }>;
};

interface CommonProps {
  animate?: boolean;
  animating?: boolean;
  name?: string;
}

export type EventsMixinInterface = ReturnType<typeof addEvents>["prototype"];

export function addEvents<
  TBase extends {
    new (props: TProps): React.Component<TProps> & ComponentWithEvents;
    getBaseProps?(props: TProps): ComponentWithEvents["baseProps"];
    role?: string;
    expectedComponents?: string[];
  },
  TProps extends CommonProps
>(WrappedComponent: TBase, options: MixinOptions = {}) {
  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  return class AddEventsMixin extends WrappedComponent {
    constructor(props: TProps) {
      super(props);

      const calculatedValues = this.getCalculatedValues(props);
      this.cacheValues(calculatedValues);
    }
    state = {};
    getEventState = Events.getEventState.bind(this);
    getScopedEvents = Events.getScopedEvents.bind(this);
    getEvents = (p, target, eventKey) => {
      return Events.getEvents.call(
        this,
        p,
        target,
        eventKey,
        this.getScopedEvents
      );
    };
    externalMutations = this.getExternalMutations(this.props);
    calculatedState = this.getStateChanges(this.props);
    globalEvents = {};
    prevGlobalEventKeys: string[] = [];
    boundGlobalEvents = {};

    shouldComponentUpdate(nextProps) {
      const externalMutations = this.getExternalMutations(nextProps);
      const animating = this.props.animating || this.props.animate;
      const newMutation = !isEqual(externalMutations, this.externalMutations);
      if (animating || newMutation) {
        this.cacheValues(this.getCalculatedValues(nextProps));
        this.externalMutations = externalMutations;
        this.applyExternalMutations(nextProps, externalMutations);
        return true;
      }
      const calculatedState = this.getStateChanges(nextProps);
      if (!isEqual(this.calculatedState, calculatedState)) {
        this.cacheValues(this.getCalculatedValues(nextProps));
        return true;
      }
      if (!isEqual(this.props, nextProps)) {
        this.cacheValues(this.getCalculatedValues(nextProps));
        return true;
      }
      return false;
    }

    componentDidMount() {
      const globalEventKeys = keys(this.globalEvents);
      globalEventKeys.forEach((key) => this.addGlobalListener(key));
      this.prevGlobalEventKeys = globalEventKeys;
    }

    componentDidUpdate(prevProps) {
      const calculatedState = this.getStateChanges(prevProps);
      this.calculatedState = calculatedState;
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

    // compile all state changes from own and parent state. Order doesn't matter, as any state
    // state change should trigger a re-render
    getStateChanges(props) {
      if (!this.hasEvents) {
        return {};
      }

      const getState = (key, type) => {
        const result = defaults(
          {},
          this.getEventState(key, type),
          this.getSharedEventState(key, type)
        );
        return isEmpty(result) ? undefined : result;
      };

      const components = options.components || defaultComponents;
      const stateChanges = components
        .map((component) => {
          if (!props.standalone && component.name === "parent") {
            // don't check for changes on parent props for non-standalone components
            return undefined;
          } else {
            return component.index !== undefined
              ? getState(component.index, component.name)
              : this.dataKeys
                  .map((key) => getState(key, component.name))
                  .filter(Boolean);
          }
        })
        .filter(Boolean);
      return stateChanges;
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

    getCalculatedValues(
      props
    ): Omit<ComponentWithEvents, "state" | "setState"> {
      const { sharedEvents } = props;
      const components = WrappedComponent.expectedComponents;
      const componentEvents = Events.getComponentEvents(props, components);
      const getSharedEventState =
        sharedEvents && isFunction(sharedEvents.getEventState)
          ? sharedEvents.getEventState
          : () => undefined;
      const baseProps = this.getBaseProps(props, getSharedEventState);
      const dataKeys = keys(baseProps).filter((key) => key !== "parent");
      const hasEvents = props.events || props.sharedEvents || componentEvents;
      const events = this.getAllEvents(props);
      return {
        componentEvents,
        getSharedEventState,
        baseProps,
        dataKeys,
        hasEvents,
        events
      };
    }

    getExternalMutations(props) {
      const { sharedEvents, externalEventMutations } = props;
      return isEmpty(externalEventMutations) || sharedEvents
        ? undefined
        : Events.getExternalMutations(
            externalEventMutations,
            this.baseProps,
            this.state
          );
    }

    cacheValues(obj) {
      keys(obj).forEach((key) => {
        this[key] = obj[key];
      });
    }

    getBaseProps(props, getSharedEventState): ComponentWithEvents["baseProps"] {
      getSharedEventState =
        getSharedEventState || this.getSharedEventState.bind(this);
      const sharedParentState = getSharedEventState("parent", "parent");
      const parentState = this.getEventState("parent", "parent");
      const baseParentProps = defaults({}, parentState, sharedParentState);
      const parentPropsList = baseParentProps.parentControlledProps;
      const parentProps = parentPropsList
        ? pick(baseParentProps, parentPropsList)
        : {};
      const modifiedProps = defaults({}, parentProps, props);

      return typeof WrappedComponent.getBaseProps === "function"
        ? WrappedComponent.getBaseProps(modifiedProps)
        : {};
    }

    getAllEvents(props) {
      if (Array.isArray(this.componentEvents)) {
        return Array.isArray(props.events)
          ? this.componentEvents.concat(...props.events)
          : this.componentEvents;
      }
      return props.events;
    }

    getComponentProps(component, type, index) {
      const name = this.props.name || WrappedComponent.role;
      const key = (this.dataKeys && this.dataKeys[index]) || index;
      const id = `${name}-${type}-${key}`;

      const baseProps =
        (this.baseProps[key] && this.baseProps[key][type]) ||
        this.baseProps[key];

      if (!baseProps && !this.hasEvents) {
        return undefined;
      }

      if (this.hasEvents) {
        const baseEvents = this.getEvents(this.props, type, key);
        const componentProps = defaults(
          { index, key: id },
          this.getEventState(key, type),
          this.getSharedEventState(key, type),
          component.props,
          baseProps,
          { id }
        );

        const events = defaults(
          {},
          Events.getPartialEvents(baseEvents, key, componentProps),
          componentProps.events
        );

        return assign({}, componentProps, { events });
      }

      return defaults({ index, key: id }, component.props, baseProps, { id });
    }

    renderContainer(component, children) {
      const isContainer = component.type && component.type.role === "container";
      const parentProps = isContainer
        ? this.getComponentProps(component, "parent", "parent")
        : {};

      if (parentProps.events) {
        this.globalEvents = Events.getGlobalEvents(parentProps.events);
        parentProps.events = Events.omitGlobalEvents(parentProps.events);
      }

      return React.cloneElement(component, parentProps, children);
    }

    animateComponent(props, defaultAnimationWhitelist) {
      const animationWhitelist =
        props.animate && props.animate.animationWhitelist
          ? props.animate.animationWhitelist
          : defaultAnimationWhitelist;

      const Comp = this.constructor;

      return (
        <VictoryTransition
          animate={props.animate}
          animationWhitelist={animationWhitelist}
        >
          <Comp {...props} />
        </VictoryTransition>
      );
    }

    // Used by `VictoryLine` and `VictoryArea`
    renderContinuousData(props) {
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataKeys = without(this.dataKeys, "all");
      const labelComponents = dataKeys.reduce((memo, key) => {
        const labelProps = this.getComponentProps(
          labelComponent,
          "labels",
          key
        );
        if (
          labelProps &&
          labelProps.text !== undefined &&
          labelProps.text !== null
        ) {
          memo = memo.concat(React.cloneElement(labelComponent, labelProps));
        }
        return memo;
      }, [] as React.ReactElement[]);

      const dataProps = this.getComponentProps(dataComponent, "data", "all");
      const children = [
        React.cloneElement(dataComponent, dataProps),
        ...labelComponents
      ];
      return this.renderContainer(groupComponent, children);
    }

    renderData(props, shouldRenderDatum = datumHasXandY) {
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataComponents = this.dataKeys.reduce(
        (validDataComponents, _dataKey, index) => {
          const dataProps = this.getComponentProps(
            dataComponent,
            "data",
            index
          );
          if (shouldRenderDatum(dataProps.datum)) {
            validDataComponents.push(
              React.cloneElement(dataComponent, dataProps)
            );
          }
          return validDataComponents;
        },
        [] as React.ReactElement[]
      );

      const labelComponents = this.dataKeys
        .map((_dataKey, index) => {
          const labelProps = this.getComponentProps(
            labelComponent,
            "labels",
            index
          );
          if (labelProps.text !== undefined && labelProps.text !== null) {
            return React.cloneElement(labelComponent, labelProps);
          }
          return undefined;
        })
        .filter(Boolean);

      const children = [...dataComponents, ...labelComponents];
      return this.renderContainer(groupComponent, children);
    }
  };
}

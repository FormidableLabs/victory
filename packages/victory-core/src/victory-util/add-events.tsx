import React from "react";
import { defaults, isEmpty, pick } from "lodash";
import isEqual from "react-fast-compare";

import { VictoryLabelableProps } from "../types/prop-types";
import { VictoryTransition } from "../victory-transition/victory-transition";
import { VictoryCommonProps, VictoryDatableProps } from "./common-props";
import { difference } from "./collection";
import type { ComponentEvent } from "./events";
import * as Events from "./events";
import { isFunction, isNil } from "./helpers";

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
  { name: "labels" },
];

export type MixinOptions = {
  components?: Array<{
    name: string;
    index?: string | number;
  }>;
};

export interface EventMixinCommonProps
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryLabelableProps {}

/**
 * These methods will be implemented by the Mixin,
 * and are accessible to the Wrapped Component.
 *
 * To make your Wrapped Component type-safe, use "interface merging" like so:
 * @example
 *    interface MyComponent extends EventsMixinClass<MyProps> {}
 *    class MyComponent extends React.Component<MyProps> { ... }
 */
export interface EventsMixinClass<TProps> {
  renderContainer(
    component: React.ReactElement,
    children: React.ReactElement | React.ReactElement[],
  ): React.ReactElement;
  cacheValues<TThis>(this: TThis, obj: Partial<TThis>): void;
  getEventState: typeof Events.getEventState;
  renderData(props: TProps);
  renderContinuousData(props: TProps);
  animateComponent(
    props: TProps,
    defaultAnimationWhitelist: string[],
  ): React.ReactElement;
  getComponentProps(
    component: React.ReactNode,
    type: string,
    index: string | number,
  ): TProps;
  dataKeys: string[];
}

/**
 * These fields are calculated by the Mixin
 */
export interface EventMixinCalculatedValues {
  componentEvents: Array<ComponentEvent>;
  getSharedEventState: (key: string, value: string) => unknown;
  baseProps: Record<string, object>;
  dataKeys: string[];
  hasEvents: unknown;
  events: unknown;
}

/**
 * These are the common roles that we care about internally.
 */
export type VictoryComponentCommonRole =
  | "container"
  | "group"
  | "histogram"
  | "label"
  | "line"
  | "portal"
  | "stack"
  | "tooltip"
  | "voronoi";

/**
 * A component can have any "role",
 * but there are certain ones that we actually care about internally
 */
export type VictoryComponentRole = VictoryComponentCommonRole | string;

/**
 * Static component fields used by Victory for common behavior
 */
export interface VictoryComponentConfiguration<TProps> {
  getBaseProps?(props: TProps): EventMixinCalculatedValues["baseProps"];
  role?: VictoryComponentRole;
  expectedComponents?: Array<keyof TProps | string>;
  getChildren?: (
    props: TProps,
    childComponents?: Array<React.ReactNode>,
    calculatedProps?: TProps,
  ) => void;
  animationWhitelist?: Array<keyof TProps | string>;
}

/**
 * This represents the class itself, including static fields
 */
export interface WrappedComponentClass<TProps>
  extends VictoryComponentConfiguration<TProps> {
  new (props: TProps): React.Component<TProps>;
}

export function addEvents<
  TBase extends WrappedComponentClass<TProps>,
  TProps extends EventMixinCommonProps,
>(WrappedComponent: TBase, options: MixinOptions = {}) {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AddEventsMixin extends EventMixinCalculatedValues {}

  // @ts-expect-error "TS2545: A mixin class must have a constructor with a single rest parameter of type 'any[]'."
  class AddEventsMixin
    extends WrappedComponent
    implements EventsMixinClass<TProps>
  {
    constructor(props: TProps) {
      super(props);

      this.cacheValues(this.getCalculatedValues(props));
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
        this.getScopedEvents,
      );
    };
    externalMutations = this.getExternalMutations(this.props);
    calculatedState = this.getStateChanges(this.props);
    globalEvents = {};
    prevGlobalEventKeys: string[] = [];
    boundGlobalEvents = {};

    shouldComponentUpdate(nextProps: TProps) {
      const externalMutations = this.getExternalMutations(nextProps);
      // @ts-expect-error "Property 'animating' does not exist on type EventMixinCommonProps"
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
      const globalEventKeys = Object.keys(this.globalEvents);
      globalEventKeys.forEach((key) => this.addGlobalListener(key));
      this.prevGlobalEventKeys = globalEventKeys;
    }

    componentDidUpdate(prevProps) {
      const calculatedState = this.getStateChanges(prevProps);
      this.calculatedState = calculatedState;
      const globalEventKeys = Object.keys(this.globalEvents);
      const removedGlobalEventKeys = difference(
        this.prevGlobalEventKeys,
        globalEventKeys,
      );
      removedGlobalEventKeys.forEach((key) => this.removeGlobalListener(key));
      const addedGlobalEventKeys = difference(
        globalEventKeys,
        this.prevGlobalEventKeys,
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
        boundListener,
      );
    }

    removeGlobalListener(key) {
      window.removeEventListener(
        Events.getGlobalEventNameFromKey(key),
        this.boundGlobalEvents[key],
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
          this.getSharedEventState(key, type),
        );
        return isEmpty(result) ? undefined : result;
      };

      const components = options.components || defaultComponents;
      const stateChanges = components
        .map((component) => {
          if (!props.standalone && component.name === "parent") {
            // don't check for changes on parent props for non-standalone components
            return undefined;
          }
          return component.index !== undefined
            ? getState(component.index, component.name)
            : this.dataKeys
                .map((key) => getState(key, component.name))
                .filter(Boolean);
        })
        .filter(Boolean);
      return stateChanges;
    }

    applyExternalMutations(props, externalMutations) {
      if (!isEmpty(externalMutations)) {
        const callbacks = props.externalEventMutations.reduce(
          (memo, mutation) =>
            isFunction(mutation.callback)
              ? memo.concat(mutation.callback)
              : memo,
          [] as Array<() => void>,
        );
        const compiledCallbacks = callbacks.length
          ? () => {
              callbacks.forEach((c) => c());
            }
          : undefined;
        this.setState(externalMutations, compiledCallbacks);
      }
    }

    getCalculatedValues(props): EventMixinCalculatedValues {
      const { sharedEvents } = props;
      const components = WrappedComponent.expectedComponents;
      const componentEvents = Events.getComponentEvents(props, components);
      const getSharedEventState =
        sharedEvents && isFunction(sharedEvents.getEventState)
          ? sharedEvents.getEventState
          : () => undefined;
      const baseProps = this.getBaseProps(props, getSharedEventState);
      const dataKeys = Object.keys(baseProps).filter((key) => key !== "parent");
      const hasEvents = props.events || props.sharedEvents || componentEvents;
      const events = this.getAllEvents(props);
      return {
        componentEvents,
        getSharedEventState,
        baseProps,
        dataKeys,
        hasEvents,
        events,
      };
    }

    getExternalMutations(props: TProps) {
      const { sharedEvents, externalEventMutations } = props;
      return isEmpty(externalEventMutations) || sharedEvents
        ? undefined
        : Events.getExternalMutations(
            externalEventMutations,
            this.baseProps,
            this.state,
          );
    }

    cacheValues(obj) {
      Object.keys(obj).forEach((key) => {
        this[key] = obj[key];
      });
    }

    getBaseProps(props, getSharedEventState): this["baseProps"] {
      const getSharedEventStateFunction =
        getSharedEventState || this.getSharedEventState.bind(this);
      const sharedParentState = getSharedEventStateFunction("parent", "parent");
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

    getComponentProps(
      component: React.ReactNode,
      type: string,
      index: string | number,
    ) {
      const name = this.props.name || WrappedComponent.role;
      const key = (this.dataKeys && this.dataKeys[index]) || index;
      const id = `${name}-${type}-${key}`;

      const baseProps =
        (this.baseProps[key] && this.baseProps[key][type]) ||
        this.baseProps[key];

      if (!baseProps && !this.hasEvents) {
        return undefined;
      }

      const currentProps =
        component && typeof component === "object" && "props" in component
          ? component.props
          : undefined;

      if (this.hasEvents) {
        const baseEvents = this.getEvents(this.props, type, key);
        const componentProps = defaults(
          { index, key: id },
          this.getEventState(key, type),
          this.getSharedEventState(key, type),
          currentProps,
          baseProps,
          { id },
        );

        const events = defaults(
          {},
          Events.getPartialEvents(baseEvents, key, componentProps),
          componentProps.events,
        );

        return Object.assign({}, componentProps, { events });
      }

      return defaults({ index, key: id }, currentProps, baseProps, { id });
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

    animateComponent(
      props: TProps,
      defaultAnimationWhitelist: string[],
    ): React.ReactElement {
      const animationWhitelist =
        (typeof props.animate === "object" &&
          props.animate?.animationWhitelist) ||
        defaultAnimationWhitelist;

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
    renderContinuousData(props: TProps) {
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataKeys = this.dataKeys.filter((value) => value !== "all");
      const labelComponents = dataKeys.reduce((memo, key) => {
        let newMemo = memo;
        const labelProps = this.getComponentProps(
          labelComponent,
          "labels",
          key,
        );
        if (
          labelProps &&
          labelProps.text !== undefined &&
          labelProps.text !== null
        ) {
          newMemo = newMemo.concat(
            React.cloneElement(labelComponent!, labelProps),
          );
        }
        return newMemo;
      }, [] as React.ReactElement[]);

      const dataProps = this.getComponentProps(dataComponent, "data", "all");
      const children = [
        React.cloneElement(dataComponent!, dataProps),
        ...labelComponents,
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
            index,
          );
          if (shouldRenderDatum(dataProps.datum)) {
            validDataComponents.push(
              React.cloneElement(dataComponent, dataProps),
            );
          }
          return validDataComponents;
        },
        [] as React.ReactElement[],
      );

      const labelComponents = this.dataKeys
        .map((_dataKey, index) => {
          const labelProps = this.getComponentProps(
            labelComponent,
            "labels",
            index,
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
  }

  return AddEventsMixin;
}

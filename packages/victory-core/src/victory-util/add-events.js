import React from "react";
import { defaults, assign, keys, isFunction, pick, without, isEmpty, isNil } from "lodash";
import Events from "./events";
import isEqual from "react-fast-compare";
import VictoryTransition from "../victory-transition/victory-transition";

const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

export default (WrappedComponent) => {
  return class addEvents extends WrappedComponent {
    constructor(props) {
      super(props);
      const getScopedEvents = Events.getScopedEvents.bind(this);
      const boundGetEvents = Events.getEvents.bind(this);
      this.state = {};
      this.getEvents = (p, target, eventKey) => {
        return boundGetEvents(p, target, eventKey, getScopedEvents);
      };
      this.getEventState = Events.getEventState.bind(this);
      const calculatedValues = this.getCalculatedValues(props);
      this.cacheValues(calculatedValues);
      this.externalMutations = this.getExternalMutations(props);
    }

    componentDidUpdate() {
      const externalMutations = this.getExternalMutations(this.props);
      if (!isEqual(this.externalMutations, externalMutations)) {
        this.externalMutations = externalMutations;
        this.applyExternalMutations(this.props, externalMutations);
      }
    }

    componentWillReceiveProps(nextProps) {
      this.cacheValues(this.getCalculatedValues(nextProps));
    }

    applyExternalMutations(props, externalMutations) {
      if (!isEmpty(externalMutations)) {
        const callbacks = props.externalEventMutations.reduce((memo, mutation) => {
          memo = isFunction(mutation.callback) ? memo.concat(mutation.callback) : memo;
          return memo;
        }, []);
        const compiledCallbacks = callbacks.length
          ? () => {
              callbacks.forEach((c) => c());
            }
          : undefined;
        this.setState(externalMutations, compiledCallbacks);
      }
    }

    getCalculatedValues(props) {
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
        : Events.getExternalMutations(externalEventMutations, this.baseProps, this.state);
    }

    cacheValues(obj) {
      keys(obj).forEach((key) => {
        this[key] = obj[key];
      });
    }

    getBaseProps(props, getSharedEventState) {
      getSharedEventState = getSharedEventState || this.getSharedEventState;
      const sharedParentState = getSharedEventState("parent", "parent");
      const parentState = this.getEventState("parent", "parent");
      const baseParentProps = defaults({}, parentState, sharedParentState);
      const parentPropsList = baseParentProps.parentControlledProps;
      const parentProps = parentPropsList ? pick(baseParentProps, parentPropsList) : {};
      const modifiedProps = defaults({}, parentProps, props);
      return isFunction(WrappedComponent.getBaseProps)
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
      const baseProps = (this.baseProps[key] && this.baseProps[key][type]) || this.baseProps[key];
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
      const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
      return React.cloneElement(component, parentProps, children);
    }

    animateComponent(props, defaultAnimationWhitelist) {
      const animationWhitelist =
        props.animate && props.animate.animationWhitelist
          ? props.animate.animationWhitelist
          : defaultAnimationWhitelist;

      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    // Used by `VictoryLine` and `VictoryArea`
    renderContinuousData(props) {
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataKeys = without(this.dataKeys, "all");
      const labelComponents = dataKeys.reduce((memo, key) => {
        const labelProps = this.getComponentProps(labelComponent, "labels", key);
        if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
          memo = memo.concat(React.cloneElement(labelComponent, labelProps));
        }
        return memo;
      }, []);
      const dataProps = this.getComponentProps(dataComponent, "data", "all");
      const children = [React.cloneElement(dataComponent, dataProps), ...labelComponents];
      return this.renderContainer(groupComponent, children);
    }

    renderData(props, shouldRenderDatum = datumHasXandY) {
      const { dataComponent, labelComponent, groupComponent } = props;

      const dataComponents = this.dataKeys.reduce((validDataComponents, _dataKey, index) => {
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        if (shouldRenderDatum(dataProps.datum)) {
          validDataComponents.push(React.cloneElement(dataComponent, dataProps));
        }
        return validDataComponents;
      }, []);

      const labelComponents = this.dataKeys
        .map((_dataKey, index) => {
          const labelProps = this.getComponentProps(labelComponent, "labels", index);
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
};

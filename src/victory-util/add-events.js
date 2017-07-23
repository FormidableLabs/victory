import React from "react";
import {
  defaults, assign, keys, isFunction, partialRight, pick, without, isEqual, isEmpty, isPlainObject
} from "lodash";
import Events from "./events";
import VictoryTransition from "../victory-transition/victory-transition";

//  used for checking calculated props. Expected components can be passed in via options
const defaultComponents = [
  { name: "parent", index: "parent" }, { name: "data" }, { name: "labels" }
];

export default (WrappedComponent, options) => {
  return class addEvents extends WrappedComponent {

    componentWillMount() {
      if (isFunction(super.componentWillMount)) {
        super.componentWillMount();
      }
      this.state = this.state || {};
      const getScopedEvents = Events.getScopedEvents.bind(this);
      this.getEvents = partialRight(Events.getEvents.bind(this), getScopedEvents);
      this.getEventState = Events.getEventState.bind(this);
      const calculatedValues = this.getCalculatedValues(this.props);
      this.cacheValues(calculatedValues);
      this.stateChanges = this.getStateChanges(this.props, calculatedValues);
    }

    shouldComponentUpdate(nextProps) {
      const calculatedValues = this.getCalculatedValues(nextProps);
      if (this.props.animate || this.props.animating) {
        this.cacheValues(calculatedValues);
        return true;
      } if (!isEqual(this.filterProps(this.props), this.filterProps(nextProps))) {
        this.cacheValues(calculatedValues);
        return true;
      }
      const calculatedState = this.getStateChanges(nextProps, calculatedValues);
      if (!isEqual(this.calculatedState, calculatedState)) {
        this.cacheValues(calculatedValues);
        this.calculatedState = calculatedState;
        return true;
      }
      return false;
    }

    // isEqual does not support equality checking on functions, and will return false
    // filter out any functions on calculated props objects (_i.e._ scale)
    filterProps(obj) {
      const removeFunctions = (o, allKeys) => {
        return allKeys.reduce((memo, key) => {
          const val = o[key];
          if (isPlainObject(val) && !isEmpty(val)) {
            memo[key] = removeFunctions(val, keys(val));
          } else {
            memo[key] = isFunction(val) ? null : val;
          }
          return memo;
        }, {});
      };
      return isPlainObject(obj) ? removeFunctions(obj, keys(obj)) : obj;
    }

    getStateChanges(props, calculatedValues) {
      const { hasEvents, getSharedEventState } = calculatedValues;
      if (!hasEvents) { return {}; }

      const getState = (key, type) => {
        const result = defaults({}, this.getEventState(key, type), getSharedEventState(key, type));
        return isEmpty(result) ? undefined : result;
      };

      options = options || {};
      const components = options.components || defaultComponents;
      return components.map((component) => {
        if (!props.standalone && component.name === "parent") {
           // don't check for changes on parent props for non-standalone components
          return undefined;
        } else {
          return component.index !== undefined ?
          getState(component.index, component.name) :
          calculatedValues.dataKeys.map((key) => getState(key, component.name));
        }
      }).filter(Boolean);
    }

    getCalculatedValues(props) {
      const { sharedEvents } = props;
      const components = WrappedComponent.expectedComponents;
      const componentEvents = Events.getComponentEvents(props, components);
      const getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
        sharedEvents.getEventState : () => undefined;
      const baseProps = this.getBaseProps(props, getSharedEventState);
      const dataKeys = Object.keys(baseProps).filter((key) => key !== "parent");
      const hasEvents = props.events || props.sharedEvents || componentEvents;
      const events = this.getAllEvents(props);
      return {
        componentEvents, getSharedEventState, baseProps, dataKeys, hasEvents, events
      };
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
      return isFunction(WrappedComponent.getBaseProps) ?
        WrappedComponent.getBaseProps(modifiedProps) : {};
    }

    getAllEvents(props) {
      if (Array.isArray(this.componentEvents)) {
        return Array.isArray(props.events) ?
          this.componentEvents.concat(...props.events) : this.componentEvents;
      }
      return props.events;
    }

    getComponentProps(component, type, index) {
      const { role } = WrappedComponent;
      const key = this.dataKeys && this.dataKeys[index] || index;
      const baseProps = this.baseProps[key][type] || this.baseProps[key];
      if (!baseProps && !this.hasEvents) {
        return undefined;
      }
      if (this.hasEvents) {
        const baseEvents = this.getEvents(this.props, type, key);
        const componentProps = defaults(
          { index, key: `${role}-${type}-${key}` },
          this.getEventState(key, type),
          this.getSharedEventState(key, type),
          component.props,
          baseProps
        );
        const events = defaults(
          {}, Events.getPartialEvents(baseEvents, key, componentProps), componentProps.events
        );
        return assign(
          {}, componentProps, { events }
        );
      }
      return defaults(
        { index, key: `${role}-${type}-${key}` },
        component.props,
        baseProps
      );
    }

    renderContainer(component, children) {
      const isContainer = component.type && component.type.role === "container";
      const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
      return React.cloneElement(component, parentProps, children);
    }

    animateComponent(props, animationWhitelist) {
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

    renderData(props) {
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataComponents = this.dataKeys.map((_dataKey, index) => {
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        return React.cloneElement(dataComponent, dataProps);
      });

      const labelComponents = this.dataKeys.map((_dataKey, index) => {
        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        if (labelProps.text !== undefined && labelProps.text !== null) {
          return React.cloneElement(labelComponent, labelProps);
        }
        return undefined;
      }).filter(Boolean);

      const children = [...dataComponents, ...labelComponents];
      return this.renderContainer(groupComponent, children);
    }
  };
};

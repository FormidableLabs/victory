import React from "react";
import { defaults, assign, isFunction, partialRight, pick, without } from "lodash";
import Events from "./events";
import VictoryTransition from "../victory-transition/victory-transition";

export default (WrappedComponent) => {
  return class addEvents extends WrappedComponent {

    componentWillMount() {
      if (isFunction(super.componentWillMount)) {
        super.componentWillMount();
      }
      this.state = this.state || {};
      const getScopedEvents = Events.getScopedEvents.bind(this);
      this.getEvents = partialRight(Events.getEvents.bind(this), getScopedEvents);
      this.getEventState = Events.getEventState.bind(this);
      this.setupEvents(this.props);
    }

    componentWillUpdate(newProps) {
      if (isFunction(super.componentWillReceiveProps)) {
        super.componentWillReceiveProps();
      }
      this.setupEvents(newProps);
    }

    setupEvents(props) {
      const { sharedEvents } = props;
      const components = WrappedComponent.expectedComponents;
      this.componentEvents = Events.getComponentEvents(props, components);
      this.getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
        sharedEvents.getEventState : () => undefined;
      this.baseProps = this.getBaseProps(props);
      this.dataKeys = Object.keys(this.baseProps).filter((key) => key !== "parent");
      this.hasEvents = props.events || props.sharedEvents || this.componentEvents;
      this.events = this.getAllEvents(props);
    }

    getBaseProps(props) {
      const sharedParentState = this.getSharedEventState("parent", "parent");
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


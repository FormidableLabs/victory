import { assign, defaults, isFunction, partialRight } from "lodash";
import React, { PropTypes } from "react";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import {
  PropTypes as CustomPropTypes, Helpers, Events, VictoryTransition, VictoryLabel,
  VictoryContainer, VictoryTheme, Bar, ClipPath
} from "victory-core";

export default (WrappedComponent) => {
  return class VictoryBase extends WrappedComponent {
    constructor() {
      super();
      this.state = {};
      const getScopedEvents = Events.getScopedEvents.bind(this);
      this.getEvents = partialRight(Events.getEvents.bind(this), getScopedEvents);
      this.getEventState = Events.getEventState.bind(this);
    }

    componentWillMount() {
      this.setupEvents(this.props);
    }

    componentWillReceiveProps(newProps) {
      this.setupEvents(newProps);
    }

    setupEvents(props) {
      const { sharedEvents } = props;
      const components = WrappedComponent.expectedComponents;
      this.componentEvents = Events.getComponentEvents(props, components);
      this.baseProps = WrappedComponent.getBaseProps(props);
      this.dataKeys = Object.keys(this.baseProps).filter((key) => key !== "parent");
      this.getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
        sharedEvents.getEventState : () => undefined;
      this.hasEvents = props.events || props.sharedEvents || this.componentEvents;
    }

    renderContainer(props, group) {
      if (isFunction(super.renderContainer)) {
        return super.renderContainer();
      }
      let parentProps;
      if (this.hasEvents) {
        const parentEvents = this.getEvents(props, "parent", "parent");
        const baseProps = defaults(
          {},
          this.getEventState("parent", "parent"),
          this.getSharedEventState("parent", "parent"),
          props.containerComponent.props,
          this.baseProps.parent
        );
        parentProps = assign(
          {}, baseProps, {events: Events.getPartialEvents(parentEvents, "parent", baseProps)}
        );
      } else {
        parentProps = defaults({}, props.containerComponent.props, this.baseProps.parent);
      }

      return React.cloneElement(props.containerComponent, parentProps, group);
    }

    renderGroup(children, style) {
      if (isFunction(super.renderGroup)) {
        return super.renderGroup();
      }
      return React.cloneElement(
        this.props.groupComponent,
        { role: "presentation", style},
        children
      );
    }

    renderData(props) {
      if (isFunction(super.renderData)) {
        return super.renderData();
      }
      const { dataComponent, labelComponent, groupComponent } = props;
      const { role } = this.constructor;
      const dataComponents = [];
      const labelComponents = [];
      const getComponentProps = (index, component, type) => {
        const key = this.dataKeys[index];
        if (this.hasEvents) {
          const events = this.getEvents(props, type, key);
          const componentProps = defaults(
            {index, key: `${role}-${type}-${key}`, role: `${role}-${index}`},
            this.getEventState(key, type),
            this.getSharedEventState(key, type),
            component.props,
            this.baseProps[key][type]
          );
          return assign(
            {}, componentProps, {events: Events.getPartialEvents(events, key, componentProps)}
          );
        }
        return defaults(
          {index, key: `${role}-${type}-${key}`, role: `${role}-${index}`},
          component.props,
          this.baseProps[key][type]
        );
      };

      for (let index = 0, len = this.dataKeys.length; index < len; index++) {
        const key = this.dataKeys[index];
        const dataProps = getComponentProps(index, dataComponent, "data");
        dataComponents[index] = React.cloneElement(dataComponent, dataProps);

        if (this.baseProps[key].labels || this.hasEvents) {
          const labelProps = getComponentProps(index, labelComponent, "labels");
          if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
            labelComponents[index] = React.cloneElement(labelComponent, labelProps);
          }
        }
      }
      return labelComponents.length > 0 ?
        React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
        dataComponents;
    }

    render() {
      if (isFunction(super.render)) {
        return super.render();
      }
      const { animationWhitelist, role, fallbackProps } = WrappedComponent;
      const props = Helpers.modifyProps((this.props), fallbackProps, role);
      const { animate, style, standalone, theme } = props;
      if (animate) {
        return (
          <VictoryTransition animate={animate} animationWhitelist={animationWhitelist}>
            {React.createElement(this.constructor, props)}
          </VictoryTransition>
        );
      }

      const styleObject = theme && theme[role] && theme[role].style ? theme[role].style : {};

      const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");
      const group = this.renderGroup(
        this.renderData(props), props, baseStyles
      );

      return standalone ? this.renderContainer(props, group) : group;
    }
  };
};


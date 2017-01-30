import { defaults, assign, isFunction, partialRight, pick } from "lodash";
import Events from "./events";

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
        const events = this.getEvents(this.props, type, key);
        const componentProps = defaults(
          {index, key: `${role}-${type}-${key}`},
          this.getEventState(key, type),
          this.getSharedEventState(key, type),
          component.props,
          baseProps
        );
        return assign(
          {}, componentProps, {events: Events.getPartialEvents(events, key, componentProps)}
        );
      }
      return defaults(
        {index, key: `${role}-${type}-${key}`},
        component.props,
        baseProps
      );
    }
  };
};


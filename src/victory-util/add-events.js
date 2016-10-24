import { defaults, assign, isFunction, partialRight } from "lodash";
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

    componentWillReceiveProps(newProps) {
      if (isFunction(super.componentWillReceiveProps)) {
        super.componentWillReceiveProps();
      }
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


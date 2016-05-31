import { isFunction, partialRight } from "lodash";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Events } from "../victory-util/index";

export default class VictorySharedEvents extends React.Component {
  static role = "shared-event-wrapper";

  static propTypes = {
    /**
     * VictoryEvents is a wrapper component that coordinates events between child components,
     * and stores shared event state
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      childName: PropTypes.string,
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ])
  };

  constructor() {
    super();
    this.state = {};
    this.getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
  }

  componentWillMount() {
    this.setUpChildren(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setUpChildren(newProps);
  }

  setUpChildren(props) {
    this.childComponents = React.Children.toArray(props.children);
    this.baseProps = this.getBasePropsFromChildren(this.childComponents);
  }

  getBasePropsFromChildren(childComponents) {
    const getBaseProps = (children) => {
      return children.reduce((memo, child, index) => {
        if (child.type && isFunction(child.type.getBaseProps)) {
          const baseChildProps = child.props && child.type.getBaseProps(child.props);
          if (baseChildProps) {
            const childKey = child.props.name || index;
            memo[childKey] = baseChildProps;
            return memo;
          }
          return memo;
        } else if (child.props && child.props.children) {
          return getBaseProps(React.Children.toArray(child.props.children));
        }
        return memo;
      }, {});
    };
    return getBaseProps(childComponents);
  }

  getNewChildren(props) {
    const {events, eventKey} = props;
    const childNames = Object.keys(this.baseProps);
    return this.childComponents.map((child, index) => {
      const childName = childNames[index];
      const childEvents = Array.isArray(events) &&
        events.filter((event) => event.childName === childName);
      return React.cloneElement(child, Object.assign(
        {
          key: `events-${index}`,
          sharedEvents: {
            events: childEvents,
            getEvents: partialRight(this.getScopedEvents, childName, this.baseProps),
            getEventState: partialRight(this.getEventState, childName)
          },
          eventKey
        },
        child.props
      ));
    });
  }

  render() {
    return <g>{this.getNewChildren(this.props)}</g>;
  }
}

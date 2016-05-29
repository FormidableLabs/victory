import { assign, isFunction, partialRight } from "lodash";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes } from "victory-core";
import Events from "../../helpers/events";

export default class VictoryEvents extends React.Component {
  static role = "event-wrapper";

  static propTypes = {
    /**
     * VictoryEvents is a wrapper component that coordinates events between child components,
     * and stores shared event state
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    events: PropTypes.object,
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ])
  };

  constructor() {
    super();
    this.state = {};
    this.getEvents = Events.getEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
  }

  componentWillMount() {
    this.setUpChildren(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setUpChildren(newProps);
  }

  setUpChildren(props) {
    const childComponents = React.Children.toArray(props.children);
    this.baseProps = this.getBasePropsFromChildren(childComponents);
    this.newChildren = this.getNewChildren(props, childComponents);
  }

  getBasePropsFromChildren(childComponents) {
    const childTypes = [];
    const getChildKey = (child) => {
      if (child.props.name) {
        return child.props.name;
      }
      const role = child.type && child.type.role;
      const count = childTypes.filter((type) => type === role).length;
      return count ? `${role}-${count}` : role;
    };

    const getBaseProps = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && isFunction(child.type.getBaseProps)) {
          const baseChildProps = child.props && child.type.getBaseProps(child.props);
          if (baseChildProps) {
            const childKey = getChildKey(child);
            memo[childKey] = baseChildProps;
            childTypes.push(child.type.role);
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

  getNewChildren(props, childComponents) {
    const {events, eventKey} = props;
    const childNames = Object.keys(this.baseProps);
    return childComponents.map((child, index) => {
      return React.cloneElement(child, assign(
        {
          key: `events-${index}`,
          sharedEvents: {
            events,
            getEvents: partialRight(this.getEvents, childNames[index]),
            getEventState: partialRight(this.getEventState, childNames[index])
          },
          eventKey
        },
        child.props
      ));
    });
  }

  render() {
    return <g>{this.newChildren}</g>;
  }

}

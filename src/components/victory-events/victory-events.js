import keys from "lodash/keys";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import Events from "../../helpers/Events";

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
    eventKey: PropTypes.string
  };

  constructor() {
    super();
    this.state = {};
    this.getEvents = Events.getEvents.bind(this);
    this.getEventState = Events.getEventState.bind(this);
  }

  getNewChildren(props) {
    const childComponents = React.Children.toArray(props.children);
    const {events, eventKey} = props
    const boundEvents = keys(events).reduce((memo, key) => {
      memo[key] = this.getEvents(events[key], key);
      return memo;
    }, {});
    return childComponents.map((child, index) => {
      return React.cloneElement(child, assign({
          key: `events-${index}`,
          sharedEvents: {events: boundEvents, getEventState: this.getEventState},
          eventKey
        },
        child.props
      ));
    });
  }

  render() {
    return <g>{this.getNewChildren(this.props)}</g>
  }

}

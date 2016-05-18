import partial from "lodash/partial";

export default {
  getPartialEvents(events, index, childProps) {
    return events ?
      Object.keys(events).reduce((memo, eventName) => {
        /* eslint max-params: 0 */
        memo[eventName] = partial(
          events[eventName],
          partial.placeholder, // evt will still be the first argument for event handlers
          childProps, // event handlers will have access to data component props, including data
          index, // used in setting a unique state property
          eventName // used in setting a unique state property
        );
        return memo;
      }, {}) :
      {};
  },

  getEvents(events, namespace) {
    const onEvent = (evt, childProps, index, eventName) => {
      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        this.setState({
          [index]: merge(
            {},
            this.state[index],
            this.props.events[namespace][eventName](evt, childProps, index)
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  },

  getEventState(index, namespace) {
    return this.state[index] && this.state[index][namespace];
  }
};

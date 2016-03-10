import partial from "lodash/function/partial";
import set from "lodash/object/set";
import assign from "lodash/object/assign";

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
    const stateName = `${namespace}State`;
    const onEvent = (evt, childProps, index, eventName) => {
      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        this.setState({
          [stateName]: assign(
            {},
            this.state[stateName],
            set({}, index, this.props.events[namespace][eventName](evt, childProps, index))
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  }
};

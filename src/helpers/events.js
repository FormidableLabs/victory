import partial from "lodash/function/partial";
import set from "lodash/object/set";
import assign from "lodash/object/assign";

export default {
  getPartialEvents(events, index, data) {
    return events ?
      Object.keys(events).reduce((memo, eventName) => {
        /* eslint max-params: 0 */
        memo[eventName] = partial(events[eventName], partial.placeholder, data, index, eventName);
        return memo;
      }, {}) :
      {};
  },

  getDataEvents(events) {
    const onDataEvent = (evt, data, index, eventName) => {
      if (this.props.events.data && this.props.events.data[eventName]) {
        this.setState({
          dataState: assign(
            {},
            this.state.dataState,
            set({}, index, this.props.events.data[eventName](evt, data, index))
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events.data).reduce((memo, event) => {
        memo[event] = onDataEvent;
        return memo;
      }, {}) : {};
  },

  getLabelEvents(events) {
    const onLabelEvent = (evt, data, index, eventName) => {
      if (this.props.events.labels && this.props.events.labels[eventName]) {
        this.setState({
          labelsState: assign(
            {},
            this.state.labelsState,
            set({}, index, this.props.events.labels[eventName](evt, data, index))
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events.labels).reduce((memo, event) => {
        memo[event] = onLabelEvent;
        return memo;
      }, {}) : {};
  }
};

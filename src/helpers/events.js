import partial from "lodash/function/partial";

export default {
  getPartialEvents(events, index, data) {
    return events ?
      Object.keys(events).reduce((memo, eventName) => {
        memo[eventName] = partial(events[eventName], index, eventName, data);
        return memo;
      }, {}) :
      {};
  },

  getDataEvents(events) {
    const onDataEvent = (childKey, eventName, evt) => {
      if (this.props.events.data && this.props.events.data[eventName]) {
        this.setState({
          dataState: Object.assign(this.state.dataState, {
            [childKey]: this.props.events.data[eventName](childKey, evt)
          })
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
    const onLabelEvent = (childKey, eventName, evt) => {
      if (this.props.events.labels && this.props.events.labels[eventName]) {
        this.setState({
          labelsState: Object.assign(this.state.labelsState, {
            [childKey]: this.props.events.labels[eventName](childKey, evt)
          })
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

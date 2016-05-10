import React, { PropTypes } from "react";
import { Helpers } from "victory-core";
import defaults from "lodash/defaults";
import omit from "lodash/omit";

export default class Slice extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object,
    datum: PropTypes.object,
    events: PropTypes.object
  };

  renderSlice(props) {
    const dataStyles = omit(props.slice.data, ["x", "y", "label"]);
    const style = Helpers.evaluateStyle(defaults({}, dataStyles, props.style), props.slice.data);
    const events = Helpers.getPartialEvents(props.events, props.index, props);
    return (
      <path
        d={props.pathFunction(props.slice)}
        style={style}
        {...events}
      />
    );
  }

  render() {
    return this.renderSlice(this.props);
  }
}

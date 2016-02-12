import React, { PropTypes } from "react";
import Radium from "radium";
import { Helpers } from "victory-util";
import merge from "lodash/object/merge";
import omit from "lodash/object/omit";

@Radium
export default class Slice extends React.Component {
  static propTypes = {
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object
  };

  renderSlice(props) {
    const dataStyles = omit(props.slice.data, ["x", "y", "label"]);
    const style = Helpers.evaluateStyle(merge({}, props.style, dataStyles), props.slice.data);
    return (
      <path
        d={props.pathFunction(props.slice)}
        style={style}
      />
    );
  }

  render() {
    return this.renderSlice(this.props);
  }
}

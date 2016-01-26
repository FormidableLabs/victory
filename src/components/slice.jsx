import React, { PropTypes } from "react";
import Radium from "radium";
import isFunction from "lodash/lang/isFunction";
import merge from "lodash/object/merge";
import omit from "lodash/object/omit";
import transform from "lodash/object/transform";

@Radium
export default class Slice extends React.Component {
  static propTypes = {
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object
  };

  evaluateStyle(style) {
    return transform(style, (result, value, key) => {
      result[key] = isFunction(value) ? value.call(this, this.props.slice.data) : value;
    });
  }

  getStyles() {
    const dataStyles = omit(this.props.slice.data, ["x", "y", "label"]);
    return this.evaluateStyle(merge({}, this.props.style, dataStyles));
  }

  renderSlice(props) {
    return (
      <path
        d={props.pathFunction.call(this, props.slice)}
        style={this.getStyles()}
      />
    );
  }

  render() {
    return this.renderSlice(this.props);
  }
}

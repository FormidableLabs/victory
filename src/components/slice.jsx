import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Slice extends React.Component {
  static propTypes = {
    slice: PropTypes.object,
    pathFunction: PropTypes.func,
    style: PropTypes.object
  };

  evaluateStyle(style) {
    return _.transform(style, (result, value, key) => {
      result[key] = _.isFunction(value) ? value.call(this, this.props.slice.data) : value;
    });
  }

  getStyles() {
    const dataStyles = _.omit(this.props.slice.data, ["x", "y", "label"]);
    return this.evaluateStyle(_.merge({}, this.props.style, dataStyles));
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

import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";
import {VictoryAnimation} from "victory-animation";

@Radium
export default class Slice extends React.Component {
  static propTypes = {
    animate: PropTypes.object,
    data: PropTypes.any,
    path: PropTypes.string,
    style: PropTypes.object
  };

  evaluateStyle(style) {
    return _.transform(style, (result, value, key) => {
      result[key] = _.isFunction(value) ? prop.call(this, this.props.data) : value;
    });
  }

  renderSlice(props) {
    const style = this.evaluateStyle(props.style)
    return (
      <path
        d={props.path}
        style={style}
      />
    );
  }

  render() {
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = _.pick(this.props, ["style", "data", "path"]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <Slice {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }
    return this.renderSlice(this.props);
  }
}

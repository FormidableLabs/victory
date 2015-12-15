import _ from "lodash";
import React, { PropTypes } from "react";
import Radium from "radium";
import {VictoryAnimation} from "victory-animation";

@Radium
export default class SliceLabel extends React.Component {
  static propTypes = {
    animate: PropTypes.object,
    data: PropTypes.any,
    label: PropTypes.any,
    positionFunction: PropTypes.func,
    slice: PropTypes.object,
    style: PropTypes.object
  };

  evaluateStyle(style) {
    return _.transform(style, (result, value, key) => {
      result[key] = this.evaluateProp(value);
    });
  }

  evaluateProp(prop) {
    return _.isFunction(prop) ? prop.call(this, this.props.data) : prop;
  }

  renderLabel(props) {
    const position = props.positionFunction.call(this, props.slice);
    return (
      <text
        dy=".35em"
        transform={`translate( ${position})`}
        style={this.evaluateStyle(props.style)}
      >
        {this.evaluateProp(props.label)}
      </text>
    );
  }

  render() {
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = _.pick(this.props, ["style", "data", "slice"]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <SliceLabel {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }
    return this.renderLabel(this.props);
  }
}

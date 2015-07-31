import React from "react";
import { interpolate } from "d3-interpolate";
import  { ease } from "d3-ease";

class VictoryAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.interpolator = null;
    this.step = 0;
    this.ease = ease(this.props.easing);
    this.startRaf = this.startRaf.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.raf && cancelAnimationFrame(this.raf);
    this.interpolator = interpolate(this.state, nextProps.data);
    this.step = 0;
    this.startRaf();
  }
  startRaf() {
    if (this.step >= 1) {
      this.step = 1;
      this.setState(this.interpolator(this.step));
      return;
    }
    this.setState(this.interpolator(this.ease(this.step)));
    this.step += this.props.velocity;
    this.raf = requestAnimationFrame(this.startRaf);
  }
  render() {
    return this.props.children(this.state);
  }
}

VictoryAnimation.propTypes = {
  velocity: React.PropTypes.number,
  easing: React.PropTypes.string,
  data: React.PropTypes.object
}

VictoryAnimation.defaultProps = {
  velocity: 0.02,
  easing: "poly-in-out",
  data: {}
}

export default VictoryAnimation;

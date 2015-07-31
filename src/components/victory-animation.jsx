import React from "react";
import d3 from "d3";

class VictoryAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.interpolator = null;
    this.step = 0;
    this.startRaf = this.startRaf.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.raf && cancelAnimationFrame(this.raf);
    this.interpolator = d3.interpolate(this.state, nextProps.data);
    this.startRaf();
  }
  startRaf() {
    if (this.step >= 1) {
      this.step = 0;
      return;
    }
    this.setState(this.interpolator(this.step))
    this.step += 0.06;
    this.raf = requestAnimationFrame(this.startRaf);
  }
  render() {
    return this.props.children(this.state);
  }
}

VictoryAnimation.propTypes = {
  duration: React.PropTypes.number,
  data: React.PropTypes.object,
  transition: React.PropTypes.array
}

VictoryAnimation.defaultProps = {
  duration: 300,
  data: {},
  transition: []
}

export default VictoryAnimation;

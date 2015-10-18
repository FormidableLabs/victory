/*global requestAnimationFrame, cancelAnimationFrame, setTimeout*/

import React from "react";
import d3 from "d3";
import { addVictoryInterpolator } from "../util";

addVictoryInterpolator();

export default class VictoryAnimation extends React.Component {
  static propTypes = {
    velocity: React.PropTypes.number,
    easing: React.PropTypes.string,
    delay: React.PropTypes.number,
    onEnd: React.PropTypes.func,
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ])
  };

  static defaultProps = {
    /* velocity modifies step each frame */
    velocity: 0.02,
    /* easing modifies step each frame */
    easing: "quad-in-out",
    /* delay between transitions */
    delay: 0,
    /* we got nothin' */
    data: {}
  };

  constructor(props) {
    super(props);
    /* defaults */
    this.state = Array.isArray(this.props.data)
      ? this.props.data[0] : this.props.data;
    this.interpolator = null;
    this.step = 0;
    this.queue = [];
    /* build easing function */
    this.ease = d3.ease(this.props.easing);
    /*
      unlike React.createClass({}), there is no autobinding of this in ES6 classes
      so we bind functionToBeRunEachFrame to current instance of victory animation class
    */
    this.functionToBeRunEachFrame = this.functionToBeRunEachFrame.bind(this);
  }
  /* lifecycle */
  componentWillReceiveProps(nextProps) {
    /* cancel existing loop if it exists */
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    /* If an object was supplied */
    if (Array.isArray(nextProps.data) === false) {
      /* compare cached version to next props */
      this.interpolator = d3.interpolate(this.state, nextProps.data);
      /* reset step to zero */
      this.step = 0;
      /* start request animation frame */
      setTimeout(() => {
        this.raf = this.functionToBeRunEachFrame();
      }, this.props.delay);
    /* If an array was supplied */
    } else {
      /* Build our tween queue */
      nextProps.data.forEach((data) => {
        this.queue.push(data);
      });
      /* Start traversing the tween queue */
      this.traverseQueue();
    }
  }
  /* Traverse the tween queue */
  traverseQueue() {
    if (this.queue.length > 0) {
      /* Get the next index */
      const data = this.queue[0];
      /* compare cached version to next props */
      this.interpolator = d3.interpolate(this.state, data);
      /* reset step to zero */
      this.step = 0;
      setTimeout(() => {
        this.raf = this.functionToBeRunEachFrame();
      }, this.props.delay);
    } else if (this.props.onEnd) {
      this.props.onEnd();
    }
  }
  /* every frame we... */
  functionToBeRunEachFrame() {
    /*
      step can generate imprecise values, sometimes greater than 1
      if this happens set the state to 1 and return, cancelling the loop
    */
    if (this.step >= 1) {
      this.step = 1;
      this.setState(this.interpolator(this.step));
      if (this.queue.length > 0) {
        cancelAnimationFrame(this.raf);
        this.queue.shift();
        this.traverseQueue();
      } else if (this.props.onEnd) {
        this.props.onEnd();
      }
      return;
    }
    /*
      if we're not at the end of the loop, set the state by passing
      current step value that's transformed by the ease function to the
      interpolator, which is cached for performance whenever props are received
    */
    this.setState(this.interpolator(this.ease(this.step)));
    /* increase step by velocity */
    this.step += this.props.velocity;
    /*
      requestAnimationFrame calls a function on a frame.
      continue the loop by feeding functionToBeRunEachFrame
    */
    this.raf = requestAnimationFrame(this.functionToBeRunEachFrame);
  }
  render() {
    return this.props.children(this.state);
  }
}

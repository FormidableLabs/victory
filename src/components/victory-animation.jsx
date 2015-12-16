/*global requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout*/

import React from "react";
import d3Ease from "d3-ease";
import d3Interpolate from "d3-interpolate";
import { addVictoryInterpolator } from "../util";

addVictoryInterpolator();

export default class VictoryAnimation extends React.Component {
  static propTypes = {
    /**
     * The child of should be a function that takes an object of tweened values
     * and returns a component to render.
     */
    children: React.PropTypes.func,
    /**
     * The velocity prop specifies how fast the animation should run.
     */
    velocity: React.PropTypes.number,
    /**
     * The easing prop specifies an easing function name to use for tweening.
     */
    easing: React.PropTypes.oneOf([
      "back", "backIn", "backOut", "backInOut",
      "bounce", "bounceIn", "bounceOut", "bounceInOut",
      "circle", "circleIn", "circleOut", "circleInOut",
      "linear", "linearIn", "linearOut", "linearInOut",
      "cubic", "cubicIn", "cubicOut", "cubicInOut",
      "elastic", "elasticIn", "elasticOut", "elasticInOut",
      "exp", "expIn", "expOut", "expInOut",
      "poly", "polyIn", "polyOut", "polyInOut",
      "quad", "quadIn", "quadOut", "quadInOut",
      "sin", "sinIn", "sinOut", "sinInOut"
    ]),
    /**
     * The delay prop specifies a delay in milliseconds before the animation
     * begins. If multiple values are in the animation queue, it is the delay
     * between each animation.
     */
    delay: React.PropTypes.number,
    /**
     * The onEnd prop specifies a function to run when the animation ends. If
     * multiple animations are in the queue, it is called after the last
     * animation.
     */
    onEnd: React.PropTypes.func,
    /**
     * The data prop specifies the latest set of values to tween to. When this
     * prop changes, VictoryAnimation will begin animating from the current
     * value to the new value.
     */
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ])
  };

  static defaultProps = {
    /* velocity modifies step each frame */
    velocity: 0.02,
    /* easing modifies step each frame */
    easing: "quadInOut",
    /* delay between transitions */
    delay: 0,
    /* we got nothin' */
    data: {}
  };

  constructor(props) {
    super(props);
    /* defaults */
    this.state = Array.isArray(this.props.data) ?
      this.props.data[0] : this.props.data;
    this.interpolator = null;
    this.step = 0;
    this.queue = Array.isArray(this.props.data) ?
      this.props.data.slice(1) : [];
    /* build easing function */
    this.ease = d3Ease[this.props.easing];
    /*
      unlike React.createClass({}), there is no autobinding of this in ES6 classes
      so we bind functionToBeRunEachFrame to current instance of victory animation class
    */
    this.functionToBeRunEachFrame = this.functionToBeRunEachFrame.bind(this);
  }
  componentDidMount() {
    if (this.queue.length) {
      this.traverseQueue();
    }
  }
  /* lifecycle */
  componentWillReceiveProps(nextProps) {
    /* cancel existing loop if it exists */
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
    /* If an object was supplied */
    if (!Array.isArray(nextProps.data)) {
      // Replace the tween queue. Could set `this.queue = [nextProps.data]`,
      // but let's reuse the same array.
      this.queue.length = 0;
      this.queue.push(nextProps.data);
    /* If an array was supplied */
    } else {
      /* Extend the tween queue */
      this.queue.push(...nextProps.data);
    }
    /* Start traversing the tween queue */
    this.traverseQueue();
  }
  componentWillUnmount() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }
  /* Traverse the tween queue */
  traverseQueue() {
    if (this.queue.length > 0) {
      /* Get the next index */
      const data = this.queue[0];
      /* compare cached version to next props */
      this.interpolator = d3Interpolate.value(this.state, data);
      /* reset step to zero */
      this.step = 0;
      this.delayTimeout = setTimeout(() => {
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

/*global setTimeout:false */
import React from "react";
import PropTypes from "prop-types";
import * as d3Ease from "d3-ease";
import { victoryInterpolator } from "./util";
import Timer from "../victory-util/timer";
import isEqual from "react-fast-compare";

export default class VictoryAnimation extends React.Component {
  static displayName = "VictoryAnimation";

  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    delay: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.oneOf([
      "back",
      "backIn",
      "backOut",
      "backInOut",
      "bounce",
      "bounceIn",
      "bounceOut",
      "bounceInOut",
      "circle",
      "circleIn",
      "circleOut",
      "circleInOut",
      "linear",
      "linearIn",
      "linearOut",
      "linearInOut",
      "cubic",
      "cubicIn",
      "cubicOut",
      "cubicInOut",
      "elastic",
      "elasticIn",
      "elasticOut",
      "elasticInOut",
      "exp",
      "expIn",
      "expOut",
      "expInOut",
      "poly",
      "polyIn",
      "polyOut",
      "polyInOut",
      "quad",
      "quadIn",
      "quadOut",
      "quadInOut",
      "sin",
      "sinIn",
      "sinOut",
      "sinInOut"
    ]),
    onEnd: PropTypes.func
  };

  static defaultProps = {
    data: {},
    delay: 0,
    duration: 1000,
    easing: "quadInOut"
  };

  static contextTypes = {
    getTimer: PropTypes.func
  };

  constructor(props) {
    super(props);
    /* defaults */
    this.state = {
      data: Array.isArray(this.props.data) ? this.props.data[0] : this.props.data,
      animationInfo: {
        progress: 0,
        animating: false
      }
    };
    this.interpolator = null;
    this.queue = Array.isArray(this.props.data) ? this.props.data.slice(1) : [];
    /* build easing function */
    this.ease = d3Ease[this.toNewName(this.props.easing)];
    /*
      There is no autobinding of this in ES6 classes
      so we bind functionToBeRunEachFrame to current instance of victory animation class
    */
    this.functionToBeRunEachFrame = this.functionToBeRunEachFrame.bind(this);
    this.getTimer = this.getTimer.bind(this);
  }

  componentDidMount() {
    // Length check prevents us from triggering `onEnd` in `traverseQueue`.
    if (this.queue.length) {
      this.traverseQueue();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const equalProps = isEqual(this.props, nextProps);
    if (!equalProps) {
      /* cancel existing loop if it exists */
      this.getTimer().unsubscribe(this.loopID);

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
    return nextState.animationInfo.animating || nextState.animationInfo.terminating || !equalProps;
  }

  componentWillUnmount() {
    if (this.loopID) {
      this.getTimer().unsubscribe(this.loopID);
    } else {
      this.getTimer().stop();
    }
  }

  getTimer() {
    if (this.context.getTimer) {
      return this.context.getTimer();
    }
    if (!this.timer) {
      this.timer = new Timer();
    }
    return this.timer;
  }

  toNewName(ease) {
    // d3-ease changed the naming scheme for ease from "linear" -> "easeLinear" etc.
    const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
    return `ease${capitalize(ease)}`;
  }

  /* Traverse the tween queue */
  traverseQueue() {
    if (this.queue.length) {
      /* Get the next index */
      const data = this.queue[0];
      /* compare cached version to next props */
      this.interpolator = victoryInterpolator(this.state.data, data);
      /* reset step to zero */
      if (this.props.delay) {
        setTimeout(() => {
          this.loopID = this.getTimer().subscribe(
            this.functionToBeRunEachFrame,
            this.props.duration
          );
        }, this.props.delay);
      } else {
        this.loopID = this.getTimer().subscribe(this.functionToBeRunEachFrame, this.props.duration);
      }
    } else if (this.props.onEnd) {
      this.props.onEnd();
    }
  }
  /* every frame we... */
  functionToBeRunEachFrame(elapsed, duration) {
    /*
      step can generate imprecise values, sometimes greater than 1
      if this happens set the state to 1 and return, cancelling the timer
    */
    duration = duration !== undefined ? duration : this.props.duration;
    const step = duration ? elapsed / duration : 1;
    if (step >= 1) {
      this.setState({
        data: this.interpolator(1),
        animationInfo: {
          progress: 1,
          animating: false,
          terminating: true
        }
      });
      if (this.loopID) {
        this.getTimer().unsubscribe(this.loopID);
      }
      this.queue.shift();
      this.traverseQueue();
      return;
    }
    /*
      if we're not at the end of the timer, set the state by passing
      current step value that's transformed by the ease function to the
      interpolator, which is cached for performance whenever props are received
    */
    this.setState({
      data: this.interpolator(this.ease(step)),
      animationInfo: {
        progress: step,
        animating: step < 1
      }
    });
  }

  render() {
    return this.props.children(this.state.data, this.state.animationInfo);
  }
}

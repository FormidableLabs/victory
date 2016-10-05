import React from "react";
import VictoryAnimation from "../victory-animation/victory-animation";
import { Transitions, Collection } from "../victory-util/index";
import { assign, defaults, isFunction, pick, filter, identity, isEqual } from "lodash";

export default class VictoryTransition extends React.Component {
  static displayName = "VictoryTransition";

  static propTypes = {
    /**
     * The animate prop specifies an animation config for the transition.
     * This prop should be given as an object.
     */
    animate: React.PropTypes.object,
    /**
     * VictoryTransition animates a single child component
     */
    children: React.PropTypes.node,
    /**
     * This prop specifies which of the child's props are safe to interpolate.
     * This props should be given as an array.
     */
    animationWhitelist: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      nodesShouldLoad: false,
      nodesDoneLoad: false,
      nodesDoneClipPathLoad: false,
      animating: true
    };
    const child = this.props.children;
    this.continuous = child.type && child.type.continuous;
    this.clipId = Math.round(Math.random() * 10000);
    this.getTransitionState = this.getTransitionState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getTransitionState(this.props, nextProps));
  }

  // TODO: This method is expensive, but also prevents unnecessary animations
  shouldAnimateProps(nextProps) {
    const getChildProps = (props) => {
      const childProps = props.children && props.children.props || {};
      return props.animationWhitelist ? pick(childProps, props.animationWhitelist) : childProps;
    };
    return !isEqual(getChildProps(this.props), getChildProps(nextProps));
  }

  shouldAnimateState(nextProps, nextState) {
    const child = this.props.children;
    // the axes don't need to transition, they should only respond to props changes
    if (child.type.role && child.type.role === "axis") {
      return false;
    }
    const animateState = (state, forceLoad) => {
      const {
        nodesWillExit, nodesWillEnter, nodesShouldEnter, nodesShouldLoad, nodesDoneLoad,
        nodesDoneClipPathLoad, nodesDoneClipPathEnter, nodesDoneClipPathExit, animating
      } = state;
      const loading = forceLoad || !nodesDoneLoad && (!!nodesShouldLoad || nodesDoneClipPathLoad);
      const entering = nodesShouldEnter || nodesWillEnter || nodesDoneClipPathEnter;
      const exiting = nodesWillExit || nodesDoneClipPathExit;
      return (animating || this.state.animating) && (loading || entering || exiting);
    };
    const props = nextState.oldProps || this.props;
    const parentState = props.animate && props.animate.parentState ||
      nextProps.animate && nextProps.animate.parentState;
    if (!parentState) {
      return animateState(nextState);
    }
    // TODO: parentState does not have the correct nodesShouldLoad state
    const forceLoad = parentState.animating && !parentState.nodesDoneLoad;
    return animateState(parentState, forceLoad);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.shouldAnimateState(nextProps, nextState)) {
      return true;
    } else if (this.shouldAnimateProps(nextProps)) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.animating !== this.state.animating && nextState.animating === false) {
      const onEnd = nextProps && nextProps.animate && nextProps.animate.onEnd || identity;
      onEnd();
    }
  }

  componentDidMount() {
    if (this.transitionProps && this.transitionProps.cb) {
      this.transitionProps.cb();
    }
  }

  getTransitionState(props, nextProps) {
    const { animate } = props;
    if (!animate) {
      return {};
    } else if (animate.parentState) {
      const oldProps = animate.parentState.nodesWillExit ? props : null;
      return {oldProps};
    } else {
      const oldChildren = React.Children.toArray(props.children);
      const nextChildren = React.Children.toArray(nextProps.children);
      const {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter,
        nodesShouldLoad,
        nodesDoneLoad,
        nodesDoneClipPathLoad,
        nodesDoneClipPathEnter,
        nodesDoneClipPathExit,
        animating
      } = Transitions.getInitialTransitionState(oldChildren, nextChildren);
      const transitionState = {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter,
        nodesShouldLoad: nodesShouldLoad || this.state.nodesShouldLoad,
        nodesDoneLoad: nodesDoneLoad || this.state.nodesDoneLoad,
        animating: animating || this.state.animating,
        oldProps: nodesWillExit ? props : null
      };
      return this.continuous ? assign(
        {
          nodesDoneClipPathEnter,
          nodesDoneClipPathExit,
          nodesDoneClipPathLoad: nodesDoneClipPathLoad || this.state.nodesDoneClipPathLoad
        },
        transitionState
      ) : transitionState;
    }
  }

  getDomainFromChildren(props, axis) {
    const getChildDomains = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && isFunction(child.type.getDomain)) {
          const childDomain = child.props && child.type.getDomain(child.props, axis);
          return childDomain ? memo.concat(childDomain) : memo;
        } else if (child.props && child.props.children) {
          return memo.concat(getChildDomains(React.Children.toArray(child.props.children)));
        }
        return memo;
      }, []);
    };

    const childComponents = React.Children.toArray(props.children);
    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
      return Array.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = getChildDomains(childComponents);
      return childDomains.length === 0 ?
        [0, 1] : [Collection.getMinValue(childDomains), Collection.getMaxValue(childDomains)];
    }
  }

  getClipPathWhitelist(transitionProps) {
    const clipPathWhitelist = ["clipWidth", "clipHeight", "translateX"];

    if ((this.state && this.state.nodesDoneClipPathExit && this.state.nodesWillExit)
      || (transitionProps.animate
        && transitionProps.animate.parentState
        && transitionProps.animate.parentState.nodesDoneClipPathExit
        && transitionProps.animate.parentState.nodesWillExit)) {
      return filter(clipPathWhitelist, (list) => {
        return list !== "clipWidth";
      });
    }
    return clipPathWhitelist;
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps : this.props;
    const getTransitionProps = this.props.animate && this.props.animate.getTransitions ?
      this.props.animate.getTransitions :
      Transitions.getTransitionPropsFactory(
        props,
        this.state,
        (newState) => this.setState(newState)
      );
    const child = React.Children.toArray(props.children)[0];
    const transitionProps = getTransitionProps(child);
    this.transitionProps = transitionProps;
    const domain = {
      x: this.getDomainFromChildren(props, "x"),
      y: this.getDomainFromChildren(props, "y")
    };
    const combinedProps = defaults(
      {domain}, transitionProps, child.props
    );
    const animationWhitelist = props.animationWhitelist || [];
    const whitelist = this.continuous ?
      animationWhitelist.concat(this.getClipPathWhitelist(transitionProps)) : animationWhitelist;
    const propsToAnimate = whitelist.length ? pick(combinedProps, whitelist) : combinedProps;
    return (
      <VictoryAnimation {...combinedProps.animate} data={propsToAnimate}>
        {(newProps) => {
          if (this.continuous) {
            const { clipWidth, clipHeight, translateX, padding } = newProps;
            const groupComponent = React.cloneElement(
              child.props.groupComponent,
              { clipWidth, clipHeight, translateX, padding, clipId: this.clipId }
            );
            return React.cloneElement(
              child, defaults({animate: null, groupComponent}, newProps, combinedProps)
            );
          }
          return React.cloneElement(
            child, defaults({animate: null}, newProps, combinedProps)
          );
        }}
      </VictoryAnimation>
    );
  }
}

import React from "react";
import VictoryAnimation from "../victory-animation/victory-animation";
import { Transitions, Collection } from "../victory-util/index";
import { assign, defaults, isFunction, pick, identity, isEqual } from "lodash";

export default class VictoryTransition extends React.Component {
  static displayName = "VictoryTransition";

  static propTypes = {
    animate: React.PropTypes.object,
    children: React.PropTypes.node,
    animationWhitelist: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      animating: true
    };
    const child = this.props.children;
    this.continuous = child.type && child.type.continuous === true;
    this.getTransitionState = this.getTransitionState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getTransitionState(this.props, nextProps));
  }

  // TODO: This method is expensive, but also prevents unnecessary animations
  shouldAnimateProps(nextProps) {
    return !isEqual(this.getWhitelistedProps(this.props), this.getWhitelistedProps(nextProps));
  }

  getWhitelistedProps(props) {
    const childProps = props.children && props.children.props || {};
    return props.animationWhitelist ? pick(childProps, props.animationWhitelist) : childProps;
  }

  shouldAnimateState(nextProps, nextState) {
    const child = this.props.children;
    // the axes don't need to transition, they should only respond to props changes
    if (child.type.role && child.type.role === "axis") {
      return false;
    }
    const parentState = this.getParentState(nextProps, nextState);
    if (!parentState) {
      return this.animateState(nextState);
    }
    // TODO: parentState does not have the correct nodesShouldLoad state
    const forceLoad = parentState.animating && !parentState.nodesDoneLoad;
    return this.animateState(parentState, forceLoad);
  }

  getParentState(nextProps, nextState) {
    const props = nextState.oldProps || this.props;
    return props.animate && props.animate.parentState ||
      nextProps.animate && nextProps.animate.parentState;
  }

  animateState(state, forceLoad) {
    const {
      nodesWillExit, nodesWillEnter, nodesShouldEnter, nodesShouldLoad, nodesDoneLoad, animating
    } = state;
    const loading = forceLoad || !nodesDoneLoad && !!nodesShouldLoad;
    const entering = nodesShouldEnter || nodesWillEnter;
    const exiting = nodesWillExit;
    return (animating || this.state.animating) && (loading || entering || exiting);
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
      const state = animate.parentState;
      const oldProps = state.nodesWillExit ? props : null;
      return {oldProps, nextProps};
    } else {
      const oldChildren = React.Children.toArray(props.children);
      const nextChildren = React.Children.toArray(nextProps.children);
      const {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter,
        animating
      } = Transitions.getInitialTransitionState(oldChildren, nextChildren);
      return {
        nodesWillExit,
        nodesWillEnter,
        childrenTransitions,
        nodesShouldEnter,
        animating: animating || this.state.animating,
        oldProps: nodesWillExit ? props : null,
        nextProps
      };
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

  pickProps() {
    if (!this.state) {
      return this.props;
    }
    return this.state.nodesWillExit ? this.state.oldProps || this.props : this.props;
  }

  pickDomainProps(props) {
    const parentState = props.animate && props.animate.parentState;
    if (parentState && parentState.nodesWillExit) {
      return this.continous || parentState.continuous ?
        parentState.nextProps || this.state.nextProps || props : props;
    }
    return this.continuous && this.state.nodesWillExit ? this.state.nextProps || props : props;
  }

  getClipProps(props, child) {
    if (!this.continuous) {
      return {};
    }
    return {
      clipHeight: child.props.height,
      clipWidth: child.props.width
    };
  }

  render() {
    const props = this.pickProps();
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
      x: this.getDomainFromChildren(this.pickDomainProps(props), "x"),
      y: this.getDomainFromChildren(props, "y")
    };
    const clipProps = this.getClipProps(props, child);
    const combinedProps = defaults(
      {domain}, clipProps, transitionProps, child.props
    );
    const animationWhitelist = props.animationWhitelist || [];
    const whitelist = this.continuous ?
      animationWhitelist.concat(["clipWidth", "clipHeight", "translateX"]) : animationWhitelist;
    const propsToAnimate = whitelist.length ? pick(combinedProps, whitelist) : combinedProps;
    return (
      <VictoryAnimation {...combinedProps.animate} data={propsToAnimate}>
        {(newProps) => {
          if (this.continuous) {
            const { clipWidth, clipHeight, translateX, padding } = newProps;
            const groupComponent = React.cloneElement(
              child.props.groupComponent,
              { clipWidth, clipHeight, translateX, padding }
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

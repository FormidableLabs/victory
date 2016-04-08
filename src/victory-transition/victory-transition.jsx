import React from "react";
import { Transitions, VictoryAnimation } from "../index";
import defaults from "lodash/defaults";
import assign from "lodash/assign";
import pick from "lodash/pick";


export default class VictoryTransition extends React.Component {
  static propTypes = {
    /**
     * The child of should be a function that takes an object of tweened values
     * and returns a component to render.
     */
    animate: React.PropTypes.object,
    children: React.PropTypes.node,
    defaultTransitions: React.PropTypes.object,
    propsToAnimate: React.PropTypes.array
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.animate) {
      return;
    }

    const {
      nodesWillExit,
      nodesWillEnter,
      childrenTransitions,
      nodesShouldEnter
    } = Transitions.getInitialTransitionState(this.props, nextProps);

    this.setState({
      nodesWillExit,
      nodesWillEnter,
      childrenTransitions,
      nodesShouldEnter,
      oldProps: nodesWillExit ? this.props : null
    });
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps : this.props;
    const getTransitionProps = Transitions.getTransitionPropsFactory(
      props,
      this.state,
      (newState) => this.setState(newState)
    );
    const child = React.Children.only(props.children);
    const domain = {
      x: child.type.getDomain(child.props, "x"),
      y: child.type.getDomain(child.props, "y")
    };
    const transitionProps = getTransitionProps(child.props, child.type, 0);
    // Do less work by having `VictoryAnimation` tween only values that
    // make sense to tween. In the future, allow customization of animated
    // prop whitelist/blacklist?
    const whitelist = [
      "data", "domain", "height", "padding", "style", "width"
    ];
    const combinedProps = defaults({domain}, transitionProps, child.props);
    const animateData = pick(combinedProps, whitelist);

    return (
      <VictoryAnimation {...combinedProps.animate} data={animateData}>
        {(newProps) => {
          return React.cloneElement(child, defaults({animate: null}, newProps, combinedProps))
        }}
      </VictoryAnimation>
    );
  }
}

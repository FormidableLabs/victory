import React from "react";
import PropTypes from "prop-types";
import { VictoryAnimation } from "../victory-animation/victory-animation";
import * as Collection from "../victory-util/collection";
import * as Helpers from "../victory-util/helpers";
import TimerContext from "../victory-util/timer-context";
import * as Transitions from "../victory-util/transitions";
import { defaults, isFunction, pick } from "lodash";
import isEqual from "react-fast-compare";
import Timer from "../victory-util/timer";

type VictoryTransitionChild = React.ReactElement<
  // Props:
  {
    polar?: boolean;
    domain?: number[] | { x: number[]; y: number[] };
    groupComponent?: React.ReactElement;
  },
  // Type:
  {
    new (props: any): React.Component<any, any>;
    continuous?: boolean;
  }
>;
interface VictoryTransitionProps {
  animate?: boolean | any;
  animationWhitelist?: string[];
  children: VictoryTransitionChild;
}

interface VictoryTransitionState {
  oldProps?: VictoryTransitionProps | null;
  nextProps?: VictoryTransitionProps;
  nodesShouldLoad?: boolean;
  nodesDoneLoad?: boolean;
  nodesWillExit?: boolean;
  nodesWillEnter?: boolean;
  nodesShouldEnter?: boolean;
  childrenTransitions?: unknown;
}

export interface VictoryTransition {
  context: React.ContextType<typeof TimerContext>;
}

export class VictoryTransition extends React.Component<
  VictoryTransitionProps,
  VictoryTransitionState
> {
  static displayName = "VictoryTransition";

  static propTypes = {
    animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    animationWhitelist: PropTypes.array,
    children: PropTypes.node,
  };

  static contextType = TimerContext;
  private continuous: boolean;
  private timer: Timer;
  private transitionProps: any;

  constructor(props, context) {
    super(props, context);
    this.state = {
      nodesShouldLoad: false,
      nodesDoneLoad: false,
    };
    const child = this.props.children;
    const polar = child.props.polar;
    this.continuous = !polar && child.type && child.type.continuous === true;
    this.timer = this.context.transitionTimer;
  }

  componentDidMount() {
    this.setState({ nodesShouldLoad: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  shouldComponentUpdate(nextProps: VictoryTransitionProps) {
    if (!isEqual(this.props, nextProps)) {
      this.timer.bypassAnimation();
      this.setState(this.getTransitionState(this.props, nextProps), () =>
        this.timer.resumeAnimation(),
      );
    }
    return true;
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  private getTransitionState(
    props: VictoryTransitionProps,
    nextProps: VictoryTransitionProps,
  ): VictoryTransitionState {
    const { animate } = props;
    if (!animate) {
      return {};
    } else if (animate.parentState) {
      const state = animate.parentState;
      const oldProps = state.nodesWillExit ? props : null;
      return { oldProps, nextProps };
    }
    const oldChildren = React.Children.toArray(props.children);
    const nextChildren = React.Children.toArray(nextProps.children);
    const {
      nodesWillExit,
      nodesWillEnter,
      childrenTransitions,
      nodesShouldEnter,
    } = Transitions.getInitialTransitionState(oldChildren, nextChildren);
    return {
      nodesWillExit,
      nodesWillEnter,
      childrenTransitions,
      nodesShouldEnter,
      oldProps: nodesWillExit ? props : null,
      nextProps,
    };
  }

  private getDomainFromChildren(
    props: VictoryTransitionProps,
    axis: "x" | "y",
  ) {
    const getChildDomains = (children) => {
      return children.reduce((memo, child) => {
        if (child.type && isFunction(child.type.getDomain)) {
          const childDomain =
            child.props && child.type.getDomain(child.props, axis);
          return childDomain ? memo.concat(childDomain) : memo;
        } else if (child.props && child.props.children) {
          return memo.concat(
            getChildDomains(React.Children.toArray(child.props.children)),
          );
        }
        return memo;
      }, []);
    };

    const child = React.Children.toArray(
      props.children,
    )[0] as VictoryTransitionChild;
    const childProps: any = child.props || {};
    const domain = Array.isArray(childProps.domain)
      ? childProps.domain
      : childProps.domain && childProps.domain[axis];
    if (!childProps.children && domain) {
      return domain;
    }
    const childDomains = getChildDomains([child]);
    return childDomains.length === 0
      ? [0, 1]
      : [
          Collection.getMinValue(childDomains),
          Collection.getMaxValue(childDomains),
        ];
  }

  pickProps() {
    if (!this.state) {
      return this.props;
    }
    return this.state.nodesWillExit
      ? this.state.oldProps || this.props
      : this.props;
  }

  private pickDomainProps(props: VictoryTransitionProps) {
    const parentState = props.animate?.parentState;
    if (parentState && parentState.nodesWillExit) {
      return this.continuous || parentState.continuous
        ? parentState.nextProps || this.state.nextProps || props
        : props;
    }
    return this.continuous && this.state.nodesWillExit
      ? this.state.nextProps || props
      : props;
  }

  getClipWidth(props, child) {
    const getDefaultClipWidth = () => {
      const range = Helpers.getRange(child.props, "x");
      return range ? Math.abs(range[1] - range[0]) : props.width;
    };
    const clipWidth = this.transitionProps
      ? this.transitionProps.clipWidth
      : undefined;
    return clipWidth !== undefined ? clipWidth : getDefaultClipWidth();
  }

  render() {
    const props = this.pickProps();
    const getTransitionProps = this.props.animate?.getTransitions
      ? this.props.animate.getTransitions
      : Transitions.getTransitionPropsFactory(props, this.state, (newState) =>
          this.setState(newState),
        );
    const child = React.Children.toArray(
      props.children,
    )[0] as VictoryTransitionChild;
    const transitionProps = getTransitionProps(child);
    this.transitionProps = transitionProps;
    const domain = {
      x: this.getDomainFromChildren(this.pickDomainProps(props), "x"),
      y: this.getDomainFromChildren(props, "y"),
    };
    const clipWidth = this.getClipWidth(props, child);
    const combinedProps = defaults(
      { domain, clipWidth },
      transitionProps,
      child.props,
    );
    const animationWhitelist = props.animationWhitelist || [];
    const whitelist = animationWhitelist.concat(["clipWidth"]);
    const propsToAnimate = whitelist.length
      ? pick(combinedProps, whitelist)
      : combinedProps;
    return (
      <VictoryAnimation {...combinedProps.animate} data={propsToAnimate}>
        {(newProps) => {
          if (child.props.groupComponent) {
            const groupComponent = this.continuous
              ? React.cloneElement(child.props.groupComponent, {
                  clipWidth: newProps.clipWidth || 0,
                })
              : child.props.groupComponent;
            return React.cloneElement(
              child,
              defaults(
                { animate: null, animating: true, groupComponent },
                newProps,
                combinedProps,
              ),
            );
          }
          return React.cloneElement(
            child,
            defaults(
              { animate: null, animating: true },
              newProps,
              combinedProps,
            ),
          );
        }}
      </VictoryAnimation>
    );
  }
}

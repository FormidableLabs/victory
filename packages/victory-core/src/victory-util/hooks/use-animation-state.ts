import React from "react";
import defaults from "lodash/defaults";

import * as Collection from "../collection";
import * as Transitions from "../transitions";

const INITIAL_STATE: AnimationState = {
  nodesShouldLoad: false,
  nodesDoneLoad: false,
  animating: true,
};

type AnyObject = Record<string, any>;

export type AnimationState = {
  nodesShouldLoad?: boolean;
  nodesDoneLoad?: boolean;
  animating?: boolean;
  childrenTransitions?: any[];
  nodesWillExit?: boolean;
  nodesWillEnter?: boolean;
  nodesShouldEnter?: boolean;
  oldProps?: AnyObject;
  nextProps?: AnyObject;
  continuous?: boolean;
};

export const useAnimationState = (initialState = INITIAL_STATE) => {
  const [state, _setState] = React.useState(initialState);

  // This allows us to use a state object and maintain the same API as this.setState
  const setState = React.useCallback(
    (newState: AnimationState) => {
      _setState((oldState) => ({ ...oldState, ...newState }));
    },
    [_setState],
  );

  // This is a copy of Wrapper.getAnimationProps
  const getAnimationProps = React.useCallback(
    (props: AnyObject | undefined, child, index) => {
      if (!props?.animate) {
        return child.props.animate;
      }
      const getFilteredState = () => {
        let childrenTransitions = state && state.childrenTransitions;
        childrenTransitions = Collection.isArrayOfArrays(childrenTransitions)
          ? childrenTransitions[index]
          : childrenTransitions;
        return defaults({ childrenTransitions }, state);
      };

      let getTransitions = props.animate && props.animate.getTransitions;
      const filteredState = getFilteredState();
      const parentState =
        (props.animate && props.animate.parentState) || filteredState;
      if (!getTransitions) {
        const getTransitionProps = Transitions.getTransitionPropsFactory(
          props,
          filteredState,
          (newState) => setState(newState),
        );
        getTransitions = (childComponent) =>
          getTransitionProps(childComponent, index);
      }
      return defaults(
        { getTransitions, parentState },
        props.animate,
        child.props.animate,
      );
    },
    [state, setState],
  );

  // This is a copy of Wrapper.setAnimationState
  const setAnimationState = React.useCallback(
    (props: AnyObject | undefined, nextProps) => {
      if (!props?.animate) {
        return;
      }
      if (props.animate.parentState) {
        const nodesWillExit = props.animate.parentState.nodesWillExit;
        const oldProps = nodesWillExit ? props : null;
        const newState = defaults(
          { oldProps, nextProps },
          props.animate.parentState,
        );
        setState(newState);
      } else {
        const oldChildren = React.Children.toArray(props.children);
        const nextChildren = React.Children.toArray(nextProps.children);
        const isContinuous = (child) => {
          const check = (c) => c.type && c.type.continuous;
          return Array.isArray(child) ? child.some(check) : check(child);
        };

        const continuous =
          !props.polar &&
          oldChildren.some((child: any) => {
            return (
              isContinuous(child) ||
              (child?.props?.children && isContinuous(child.props.children))
            );
          });
        const {
          nodesWillExit,
          nodesWillEnter,
          childrenTransitions,
          nodesShouldEnter,
        } = Transitions.getInitialTransitionState(oldChildren, nextChildren);

        setState({
          nodesWillExit,
          nodesWillEnter,
          nodesShouldEnter,
          childrenTransitions: Collection.isArrayOfArrays(childrenTransitions)
            ? childrenTransitions[0]
            : childrenTransitions,
          oldProps: nodesWillExit ? props : undefined,
          nextProps,
          continuous,
        });
      }
    },
    [setState],
  );

  const getProps = React.useCallback(
    (initialProps: AnyObject) => {
      return state && state.nodesWillExit
        ? state.oldProps || initialProps
        : initialProps;
    },
    [state],
  );

  return { state, setState, getAnimationProps, setAnimationState, getProps };
};

import React from "react";
import { defaults, some } from "lodash";

import * as Collection from "./collection";
import * as Transitions from "./transitions";

export const usePreviousProps = (props) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = props;
  });
  return ref.current || {};
};

export const useAnimationState = (initialState = {}) => {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    console.log("state", state);
    console.log(state.nodesShouldLoad);
  }, [state]);

  // This is a copy of Wrapper.getAnimationProps
  const getAnimationProps = React.useCallback(
    (props, child, index) => {
      if (!props.animate) {
        return child.props.animate;
      }
      const getFilteredState = () => {
        let childrenTransitions = state && state.childrenTransitions;
        // childrenTransitions is sometimes undefined
        childrenTransitions = Collection.isArrayOfArrays(childrenTransitions)
          ? childrenTransitions[index]
          : childrenTransitions;
        return defaults({ childrenTransitions }, state);
      };

      let getTransitions = props.animate && props.animate.getTransitions;
      const filteredState = getFilteredState();
      // parentState is alternating between correct value and {childrenTransitions: undefined, nodesDoneLoad: true}
      // the value of parentState is always filteredState
      const parentState =
        (props.animate && props.animate.parentState) || filteredState;
      // ERROR IS HERE
      // If I comment out these lines, it does not change the state to { nodesWillExit: true }
      // but it still doesn't handle the domain correctly
      if (!getTransitions) {
        const getTransitionProps = Transitions.getTransitionPropsFactory(
          props,
          filteredState,
          (newState) => setState(newState)
        );
        getTransitions = (childComponent) =>
          getTransitionProps(childComponent, index);
      }
      return defaults(
        { getTransitions, parentState },
        props.animate,
        child.props.animate
      );
    },
    [state, setState]
  );

  // This is a copy of Wrapper.setAnimationState
  const setAnimationState = React.useCallback(
    (props, nextProps) => {
      if (!props.animate) {
        return;
      }
      if (props.animate.parentState) {
        const nodesWillExit = props.animate.parentState.nodesWillExit;
        const oldProps = nodesWillExit ? props : null;
        setState(defaults({ oldProps, nextProps }, props.animate.parentState));
      } else {
        const oldChildren = React.Children.toArray(props.children);
        const nextChildren = React.Children.toArray(nextProps.children);
        const isContinuous = (child) => {
          const check = (c) => c.type && c.type.continuous;
          return Array.isArray(child) ? some(child, check) : check(child);
        };

        const continuous =
          !props.polar &&
          some(oldChildren, (child) => {
            return (
              isContinuous(child) ||
              (child.props.children && isContinuous(child.props.children))
            );
          });
        const {
          nodesWillExit,
          nodesWillEnter,
          childrenTransitions,
          nodesShouldEnter
        } = Transitions.getInitialTransitionState(oldChildren, nextChildren);

        setState({
          nodesWillExit,
          nodesWillEnter,
          nodesShouldEnter,
          childrenTransitions: Collection.isArrayOfArrays(childrenTransitions)
            ? childrenTransitions[0]
            : childrenTransitions,
          oldProps: nodesWillExit ? props : null,
          nextProps,
          continuous
        });
      }
    },
    [setState]
  );

  const getProps = React.useCallback(
    (initialProps) => {
      return state && state.nodesWillExit
        ? state.oldProps || initialProps
        : initialProps;
    },
    [state]
  );

  return { state, setState, getAnimationProps, setAnimationState, getProps };
};

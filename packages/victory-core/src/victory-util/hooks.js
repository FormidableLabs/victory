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

  // This is a copy of Wrapper.getAnimationProps
  const getAnimationProps = React.useCallback(
    (childProps, child, index) => {
      if (!childProps.animate) {
        return child.props.animate;
      }
      const getFilteredState = () => {
        let childrenTransitions = state.childrenTransitions;
        childrenTransitions = Collection.isArrayOfArrays(childrenTransitions)
          ? childrenTransitions[index]
          : childrenTransitions;
        return defaults({ childrenTransitions }, state);
      };

      let getTransitions =
        childProps.animate && childProps.animate.getTransitions;
      const filteredState = getFilteredState();
      const parentState =
        (childProps.animate && childProps.animate.parentState) || state;
      if (!getTransitions) {
        const getTransitionProps = Transitions.getTransitionPropsFactory(
          childProps,
          filteredState,
          (newState) => setState(newState)
        );
        getTransitions = (childComponent) =>
          getTransitionProps(childComponent, index);
      }
      return defaults(
        { getTransitions, parentState },
        childProps.animate,
        child.props.animate
      );
    },
    [state]
  );

  // This is a copy of Wrapper.setAnimationState
  const setAnimationState = React.useCallback(
    (previousProps, props) => {
      if (!previousProps.animate) {
        return;
      }
      if (previousProps.animate.parentState) {
        const nodesWillExit = previousProps.animate.parentState.nodesWillExit;
        const oldProps = nodesWillExit ? previousProps : null;
        setState(
          defaults({ oldProps, props }, previousProps.animate.parentState)
        );
      } else {
        const oldChildren = React.Children.toArray(previousProps.children);
        const nextChildren = React.Children.toArray(props.children);
        const isContinuous = (child) => {
          const check = (c) => c.type && c.type.continuous;
          return Array.isArray(child) ? some(child, check) : check(child);
        };

        const continuous =
          !previousProps.polar &&
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
          oldProps: nodesWillExit ? previousProps : null,
          nextProps: props,
          continuous
        });
      }
    },
    [setState]
  );

  return { state, setState, getAnimationProps, setAnimationState };
};

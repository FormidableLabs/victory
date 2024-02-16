import { defaults, identity } from "lodash";
import React from "react";
import { AnimatePropTypeInterface } from "../types/prop-types";

function getDatumKey(datum, idx) {
  return (datum.key || idx).toString();
}

function getKeyedData(data) {
  return data.reduce((keyedData, datum, idx) => {
    const key = getDatumKey(datum, idx);
    keyedData[key] = datum;
    return keyedData;
  }, {});
}

function getKeyedDataDifference(a, b) {
  let hasDifference = false;
  const difference = Object.keys(a).reduce((_difference, key) => {
    if (!(key in b)) {
      hasDifference = true;
      _difference[key] = true;
    }
    return _difference;
  }, {});
  return hasDifference && difference;
}

/**
 * Calculate which data-points exist in oldData and not nextData -
 * these are the `exiting` data-points.  Also calculate which
 * data-points exist in nextData and not oldData - these are the
 * `entering` data-points.
 *
 * @param  {Array} oldData   this.props.data Array
 * @param  {Array} nextData  this.props.data Array
 *
 * @return {Object}          Object with `entering` and `exiting` properties.
 *                           entering[datum.key] will be true if the data is
 *                           entering, and similarly for `exiting`.
 */
function getNodeTransitions(oldData, nextData) {
  const oldDataKeyed = oldData && getKeyedData(oldData);
  const nextDataKeyed = nextData && getKeyedData(nextData);

  return {
    entering:
      oldDataKeyed && getKeyedDataDifference(nextDataKeyed, oldDataKeyed),
    exiting:
      nextDataKeyed && getKeyedDataDifference(oldDataKeyed, nextDataKeyed),
  };
}

function getChildData(child) {
  if (child.type && child.type.getData) {
    return child.type.getData(child.props);
  }
  return (child.props && child.props.data) || false;
}

/**
 * If a parent component has animation enabled, calculate the transitions
 * for any data of any child component that supports data transitions.
 * Data transitions are defined as any two datasets where data nodes exist
 * in the first set and not the second, in the second and not the first,
 * or both.
 *
 * @param  {Children}  oldChildren   this.props.children from old props
 * @param  {Children}  nextChildren  this.props.children from next props
 *
 * @return {Object}                  Object with the following properties:
 *                                    - nodesWillExit
 *                                    - nodesWillEnter
 *                                    - childrenTransitions
 *                                    - nodesShouldEnter
 */
export function getInitialTransitionState(oldChildren, nextChildren) {
  let nodesWillExit = false;
  let nodesWillEnter = false;

  const getTransition = (oldChild, newChild) => {
    if (!newChild || oldChild.type !== newChild.type) {
      return {};
    }
    const { entering, exiting } =
      getNodeTransitions(getChildData(oldChild), getChildData(newChild)) || {};

    nodesWillExit = nodesWillExit || !!exiting;
    nodesWillEnter = nodesWillEnter || !!entering;

    return { entering: entering || false, exiting: exiting || false };
  };

  const getTransitionsFromChildren = (old, next) => {
    return old.map((child, idx) => {
      if (child && child.props && child.props.children && next[idx]) {
        return getTransitionsFromChildren(
          React.Children.toArray(old[idx].props.children),
          React.Children.toArray(next[idx].props.children),
        );
      }
      // get Transition entering and exiting nodes
      return getTransition(child, next[idx]);
    });
  };

  const childrenTransitions = getTransitionsFromChildren(
    React.Children.toArray(oldChildren),
    React.Children.toArray(nextChildren),
  );
  return {
    nodesWillExit,
    nodesWillEnter,
    childrenTransitions,
    // TODO: This may need to be refactored for the following situation.
    //       The component receives new props, and the data provided
    //       is a perfect match for the previous data and domain except
    //       for new nodes. In this case, we wouldn't want a delay before
    //       the new nodes appear.
    nodesShouldEnter: false,
  };
}

type TransitionProps = {
  data;
  animate?: AnimatePropTypeInterface;
  clipWidth?: number;
};

function getInitialChildProps(animate, data): TransitionProps {
  const after =
    animate.onEnter && animate.onEnter.after ? animate.onEnter.after : identity;
  return {
    data: data.map((datum, idx) =>
      Object.assign({}, datum, after(datum, idx, data)),
    ),
  };
}

// eslint-disable-next-line max-params
function getChildBeforeLoad(animate, child, data, cb): TransitionProps {
  const newAnimate = Object.assign({}, animate, { onEnd: cb });

  if (newAnimate && newAnimate.onLoad && !newAnimate.onLoad.duration) {
    return { animate: newAnimate, data };
  }
  const before =
    newAnimate.onLoad && newAnimate.onLoad.before
      ? newAnimate.onLoad.before
      : identity;
  // If nodes need to exit, transform them with the provided onLoad.before function.
  const newData = data.map((datum, idx) => {
    return Object.assign({}, datum, before(datum, idx, data));
  });

  return { animate: newAnimate, data: newData, clipWidth: 0 };
}

// eslint-disable-next-line max-params
function getChildOnLoad(animate, data, cb): TransitionProps {
  const newAnimate = Object.assign({}, animate, { onEnd: cb });
  let newData = data;

  if (newAnimate && newAnimate.onLoad && !newAnimate.onLoad.duration) {
    return { animate, data };
  }
  const after =
    animate.onLoad && animate.onLoad.after ? animate.onLoad.after : identity;
  // If nodes need to exit, transform them with the provided onLoad.after function.
  newData = data.map((datum, idx) => {
    return Object.assign({}, datum, after(datum, idx, data));
  });

  return { animate: newAnimate, data: newData };
}

// eslint-disable-next-line max-params, max-len
function getChildPropsOnExit(
  animate,
  child,
  data,
  exitingNodes,
  cb,
): TransitionProps {
  // Whether or not _this_ child has exiting nodes, we want the exit-
  // transition for all children to have the same duration, delay, etc.
  const onExit = animate && animate.onExit;
  const newAnimate = Object.assign({}, animate, onExit);
  let newData = data;

  if (exitingNodes) {
    // After the exit transition occurs, trigger the animations for
    // nodes that are neither exiting nor entering.
    animate.onEnd = cb;
    const before =
      animate.onExit && animate.onExit.before
        ? animate.onExit.before
        : identity;
    // If nodes need to exit, transform them with the provided onExit.before function.
    newData = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return exitingNodes[key]
        ? Object.assign({}, datum, before(datum, idx, data))
        : datum;
    });
  }

  return { animate: newAnimate, data: newData };
}

// eslint-disable-next-line max-params,max-len
function getChildPropsBeforeEnter(
  animate,
  child,
  data,
  enteringNodes,
  cb,
): TransitionProps {
  let newAnimate = animate;
  let newData = data;
  if (enteringNodes) {
    // Perform a normal animation here, except - when it finishes - trigger
    // the transition for entering nodes.
    newAnimate = Object.assign({}, animate, { onEnd: cb });
    const before =
      animate.onEnter && animate.onEnter.before
        ? animate.onEnter.before
        : identity;
    // We want the entering nodes to be included in the transition target
    // domain.  However, we may not want these nodes to be displayed initially,
    // so perform the `onEnter.before` transformation on each node.
    newData = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return enteringNodes[key]
        ? Object.assign({}, datum, before(datum, idx, data))
        : datum;
    });
  }

  return { animate: newAnimate, data: newData };
}

// eslint-disable-next-line max-params, max-len
function getChildPropsOnEnter(
  animate,
  data,
  enteringNodes,
  cb,
): TransitionProps {
  // Whether or not _this_ child has entering nodes, we want the entering-
  // transition for all children to have the same duration, delay, etc.
  const onEnter = animate && animate.onEnter;
  const newAnimate = Object.assign({}, animate, onEnter);
  let newData = data;

  if (enteringNodes) {
    // Old nodes have been transitioned to their new values, and the
    // domain should encompass the nodes that will now enter. So perform
    // the `onEnter.after` transformation on each node.
    newAnimate.onEnd = cb;
    const after =
      newAnimate.onEnter && newAnimate.onEnter.after
        ? newAnimate.onEnter.after
        : identity;
    newData = data.map((datum, idx) => {
      const key = getDatumKey(datum, idx);
      return enteringNodes[key]
        ? Object.assign({}, datum, after(datum, idx, data))
        : datum;
    });
  }
  return { animate: newAnimate, data: newData };
}

/**
 * getTransitionPropsFactory - putting the Java in JavaScript.  This will return a
 * function that returns prop transformations for a child, given that child's props
 * and its index in the parent's children array.
 *
 * In particular, this will include an `animate` object that is set appropriately
 * so that each child will be synchronized for each stage of a transition
 * animation.  It will also include a transformed `data` object, where each datum
 * is transformed by `animate.onExit` and `animate.onEnter` `before` and `after`
 * functions.
 *
 * @param  {Object}  props       `this.props` for the parent component.
 * @param  {Object} state        `this.state` for the parent component.
 * @param  {Function} setState    Function that, when called, will `this.setState` on
 *                                 the parent component with the provided object.
 *
 * @return {Function}              Child-prop transformation function.
 */
export function getTransitionPropsFactory(props, state, setState) {
  const nodesWillExit = state && state.nodesWillExit;
  const nodesWillEnter = state && state.nodesWillEnter;
  const nodesShouldEnter = state && state.nodesShouldEnter;
  const nodesShouldLoad = state && state.nodesShouldLoad;
  const nodesDoneLoad = state && state.nodesDoneLoad;
  const childrenTransitions = (state && state.childrenTransitions) || [];
  const transitionDurations = {
    enter:
      props.animate && props.animate.onEnter && props.animate.onEnter.duration,
    exit:
      props.animate && props.animate.onExit && props.animate.onExit.duration,
    load:
      props.animate && props.animate.onLoad && props.animate.onLoad.duration,
    move: props.animate && props.animate.duration,
  };

  const onLoad = (child, data, animate) => {
    if (nodesShouldLoad) {
      return getChildOnLoad(animate, data, () => {
        setState({ nodesShouldLoad: false, nodesDoneLoad: true });
      });
    }

    return getChildBeforeLoad(animate, child, data, () => {
      setState({ nodesDoneLoad: true });
    });
  };

  // eslint-disable-next-line max-params
  const onExit = (nodes, child, data, animate) => {
    return getChildPropsOnExit(animate, child, data, nodes, () => {
      setState({ nodesWillExit: false });
    });
  };

  // eslint-disable-next-line max-params
  const onEnter = (nodes, child, data, animate) => {
    if (nodesShouldEnter) {
      return getChildPropsOnEnter(animate, data, nodes, () => {
        setState({ nodesWillEnter: false });
      });
    }

    return getChildPropsBeforeEnter(animate, child, data, nodes, () => {
      setState({ nodesShouldEnter: true });
    });
  };

  const getChildTransitionDuration = function (child, type) {
    const animate = child.props.animate;
    if (!child.type) {
      return {};
    }
    const defaultTransitions =
      child.props && child.props.polar
        ? child.type.defaultPolarTransitions || child.type.defaultTransitions
        : child.type.defaultTransitions;
    if (defaultTransitions) {
      const animationDuration = animate[type] && animate[type].duration;
      return animationDuration !== undefined
        ? animationDuration
        : defaultTransitions[type] && defaultTransitions[type].duration;
    }
    return {};
  };

  // eslint-disable-next-line max-statements, complexity, max-len
  return function getTransitionProps(child, index): TransitionProps {
    const data = getChildData(child) || [];
    const animate: AnimatePropTypeInterface = defaults(
      {},
      props.animate,
      child.props.animate,
    );
    const defaultTransitions = child.props.polar
      ? child.type.defaultPolarTransitions || child.type.defaultTransitions
      : child.type.defaultTransitions;

    animate.onExit = defaults(
      {},
      animate.onExit,
      defaultTransitions && defaultTransitions.onExit,
    );
    animate.onEnter = defaults(
      {},
      animate.onEnter,
      defaultTransitions && defaultTransitions.onEnter,
    );
    animate.onLoad = defaults(
      {},
      animate.onLoad,
      defaultTransitions && defaultTransitions.onLoad,
    );

    const childTransitions =
      childrenTransitions[index] || childrenTransitions[0];
    if (!nodesDoneLoad) {
      // should do onLoad animation
      const load =
        transitionDurations.load !== undefined
          ? transitionDurations.load
          : getChildTransitionDuration(child, "onLoad");
      const animation = { duration: load };
      return onLoad(child, data, Object.assign({}, animate, animation));
    } else if (nodesWillExit) {
      const exitingNodes = childTransitions && childTransitions.exiting;
      const exit =
        transitionDurations.exit !== undefined
          ? transitionDurations.exit
          : getChildTransitionDuration(child, "onExit");
      // if nodesWillExit, but this child has no exiting nodes, set a delay instead of a duration
      const animation = exitingNodes ? { duration: exit } : { delay: exit };
      return onExit(
        exitingNodes,
        child,
        data,
        Object.assign({}, animate, animation),
      );
    } else if (nodesWillEnter) {
      const enteringNodes = childTransitions && childTransitions.entering;
      const enter =
        transitionDurations.enter !== undefined
          ? transitionDurations.enter
          : getChildTransitionDuration(child, "onEnter");
      const move =
        transitionDurations.move !== undefined
          ? transitionDurations.move
          : child.props.animate && child.props.animate.duration;
      const animation = {
        duration: nodesShouldEnter && enteringNodes ? enter : move,
      };
      return onEnter(
        enteringNodes,
        child,
        data,
        Object.assign({}, animate, animation),
      );
    } else if (!state && animate && animate.onExit) {
      // This is the initial render, and nodes may enter when props change. Because
      // animation interpolation is determined by old- and next- props, data may need
      // to be augmented with certain properties.
      //
      // For example, it may be desired that exiting nodes go from `opacity: 1` to
      // `opacity: 0`. Without setting this on a per-datum basis, the interpolation
      // might go from `opacity: undefined` to `opacity: 0`, which would result in
      // interpolated `opacity: NaN` values.
      //
      return getInitialChildProps(animate, data);
    }
    return { animate, data };
  };
}

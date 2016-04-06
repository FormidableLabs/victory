/* eslint-disable func-style */

import assign from "lodash/assign";
import identity from "lodash/identity";

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
 * these are the `entering` data-points.  Also calculate which
 * data-points exist in nextData and not oldData - thses are the
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
  const oldDataKeyed = getKeyedData(oldData);
  const nextDataKeyed = getKeyedData(nextData);

  return {
    entering: getKeyedDataDifference(nextDataKeyed, oldDataKeyed),
    exiting: getKeyedDataDifference(oldDataKeyed, nextDataKeyed)
  };
}

/**
 * If a parent component has animation enabled, calculate the transitions
 * for any data of any child component that supports data transitions
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

  // Children may be a single item, rather than an array.
  oldChildren = [].concat(oldChildren);
  nextChildren = [].concat(nextChildren);

  const childrenTransitions = oldChildren.map((child, idx) => {
    // TODO: Determine if/how we want to support variable-length children.
    const nextChild = nextChildren[idx];
    if (!nextChild || child.type !== nextChild.type) {
      return {};
    }

    const { entering, exiting } =
      child.type.defaultTransitions &&
      getNodeTransitions(child.props.data, nextChild.props.data) ||
      {};

    nodesWillExit = nodesWillExit || !!exiting;
    nodesWillEnter = nodesWillEnter || !!entering;

    return { entering, exiting };
  });

  return {
    nodesWillExit,
    nodesWillEnter,
    childrenTransitions,
    // TODO: This may need to be refactored for the following situation.
    //       The component receives new props, and the data provided
    //       is a perfect match for the previous data and domain except
    //       for new nodes. In this case, we wouldn't want a delay before
    //       the new nodes appear.
    nodesShouldEnter: false
  };
}


function getInitialChildProps(animate, data) {
  const before = animate.onExit && animate.onExit.before ? animate.onExit.before : identity;
  return {
    data: data.map((datum) => assign({}, datum, before(datum))),
    animate: {}
  };
}

function getChildPropsOnExit(animate, data, exitingNodes, cb) { // eslint-disable-line max-params
  // Whether or not _this_ child has exiting nodes, we want the exit-
  // transition for all children to have the same duration, delay, etc.
  const onExit = animate && animate.onExit;
  animate = assign({}, animate, onExit);

  if (exitingNodes) {
    // After the exit transition occurs, trigger the animations for
    // nodes that are neither exiting or entering.
    animate.onEnd = cb;
    const after = animate.onExit && animate.onExit.after ? animate.onExit.after : identity;
    // If nodes need to exit, transform them with the provided onExit.after function.
    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return exitingNodes[key] ? assign({}, datum, after(datum)) : datum;
    });
  }

  return { animate, data };
}

function getChildPropsBeforeEnter(animate, data, enteringNodes, cb) { // eslint-disable-line max-params,max-len
  if (enteringNodes) {
    // Perform a normal animation here, except - when it finishes - trigger
    // the transition for entering nodes.
    animate = assign({}, animate, { onEnd: cb });
    const before = animate.onEnter && animate.onEnter.before ? animate.onEnter.before : identity;
    // We want the entering nodes to be included in the transition target
    // domain.  However, we may not want these nodes to be displayed initially,
    // so perform the `onEnter.before` transformation on each node.
    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return enteringNodes[key] ? assign({}, datum, before(datum)) : datum;
    });
  }

  return { animate, data };
}

function getChildPropsOnEnter(animate, data, enteringNodes) {
  // Whether or not _this_ child has entering nodes, we want the entering-
  // transition for all children to have the same duration, delay, etc.
  const onEnter = animate && animate.onEnter;
  animate = assign({}, animate, onEnter);

  if (enteringNodes) {
    // Old nodes have been transitioned to their new values, and the
    // domain should encompass the nodes that will now enter. So perform
    // the `onEnter.after` transformation on each node.
    const after = animate.onEnter && animate.onEnter.after ? animate.onEnter.after : identity;
    data = data.map((datum, idx) => {
      const key = getDatumKey(datum, idx);
      return enteringNodes[key] ? assign({}, datum, after(datum)) : datum;
    });
  }
  return { animate, data };
}

/**
 * For each transition type (enter, exit, move), find the longest duration
 * of each type from any of the children.
 *
 * @param  {Array}  children            `this.props.children` from parent component.
 * @param  {Object} childrenTransitions Child transitions data, as calculated by the
 *                                      `getInitialTransitionState` function.
 * @param  {Object} parentAnimate       `this.props.animate` from parent component, to
 *                                      be used for transition duration defaults.
 *
 * @return {Object}                     `{ exit, enter, move }`
 */
function getTransitionDurations(children, childrenTransitions, parentAnimate) {
  if (!childrenTransitions) {
    return {};
  }

  return children.reduce((durations, child, idx) => {
    const onExit =
      child.props.animate &&
      child.props.animate.onExit ||
      child.type.defaultTransitions &&
      child.type.defaultTransitions.onExit;
    const onEnter =
      child.props.animate &&
      child.props.animate.onEnter ||
      child.type.defaultTransitions &&
      child.type.defaultTransitions.onEnter;

    if (
      childrenTransitions[idx] &&
      childrenTransitions[idx].exiting &&
      onExit &&
      onExit.duration > durations.exit
    ) {
      durations.exit = onExit.duration;
    }
    if (
      childrenTransitions[idx] &&
      childrenTransitions[idx].entering &&
      onEnter &&
      onEnter.duration > durations.enter
    ) {
      durations.enter = onEnter.duration;
    }
    if (
      child.props.animate &&
      child.props.animate.duration > durations.move
    ) {
      durations.move = child.props.animate.duration;
    }

    return durations;
  }, {
    exit: parentAnimate.onExit && parentAnimate.onExit.duration || null,
    enter: parentAnimate.onEnter && parentAnimate.onEnter.duration || null,
    move: parentAnimate.duration || null
  });
}

/**
 * getTransitionPropsFactory - putting the Java in JavaScript.  This will return a
 * function that returns prop transformations for a child, given that child's props
 * and its index in the parent's children array.
 *
 * In particular, this will include an `animate` object that is set appropriately
 * so that each child will be synchoronized for each stage of a transition
 * animation.  It will also include a transformed `data` object, where each datum
 * is transformed by `animate.onExit` and `animate.onEnter` `before` and `after`
 * functions.
 *
 * @param  {Array}  children       `this.props.children` for the parent component.
 * @param  {Object} parentState    `this.state` for the parent component.
 * @param  {Object} parentAnimate  `this.props.animate` for the parent component.
 * @param  {Object} setParentState Function that, when called, will `this.setState` on
 *                                 the parent component with the provided object.
 *
 * @return {Function}              Child-prop transformation function.
 */
export function getTransitionPropsFactory(children, parentState, parentAnimate, setParentState) { // eslint-disable-line max-params,max-len
  const nodesWillExit = parentState && parentState.nodesWillExit;
  const nodesWillEnter = parentState && parentState.nodesWillEnter;
  const nodesShouldEnter = parentState && parentState.nodesShouldEnter;
  const childrenTransitions = parentState && parentState.childrenTransitions;

  const transitionDurations = getTransitionDurations(children, childrenTransitions, parentAnimate);

  return function getTransitionProps(childProps, childType, index) { // eslint-disable-line max-statements,max-len
    if (!childProps.data) {
      return {};
    }

    let animate = assign({}, childProps.animate || parentAnimate);

    if (childType.defaultTransitions) {
      animate.onExit = animate.onExit || childType.defaultTransitions.onExit;
      animate.onEnter = animate.onEnter || childType.defaultTransitions.onEnter;
    }

    const data = childProps.data;

    if (nodesWillExit) {
      const exitingNodes = childrenTransitions[index] && childrenTransitions[index].exiting;
      // Synchronize exit-transition durations for all child components.
      animate = assign(animate, { duration: transitionDurations.exit });

      return getChildPropsOnExit(animate, data, exitingNodes, () =>
        setParentState({ nodesWillExit: false }));
    } else if (nodesWillEnter) {
      const enteringNodes = childrenTransitions[index] && childrenTransitions[index].entering;
      animate = assign(
        animate,
        // Synchronize normal animate and enter-transition durations for all child
        // components, ONLY IF an enter-transition will occur.  Otherwise, child
        // components can have different durations for shared-node animations.
        { duration: transitionDurations[nodesShouldEnter ? "enter" : "move"] }
      );

      return nodesShouldEnter ?
        getChildPropsOnEnter(animate, data, enteringNodes) :
        getChildPropsBeforeEnter(animate, data, enteringNodes, () =>
          setParentState({ nodesShouldEnter: true }));
    } else if (!parentState && animate && animate.onExit) {
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

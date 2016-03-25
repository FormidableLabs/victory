import assign from "lodash/assign";


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
export function getInitialTransitionState (oldChildren, nextChildren) {
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
        child.type.supportsTransitions &&
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
  data = data.map((datum, idx) => {
    const key = getDatumKey(datum, idx);
    return assign({}, datum, animate.onExit.before(datum));
  });

  return { data };
}

function getChildPropsOnExit(animate, data, exitingNodes, cb) {
  // Whether or not _this_ child has exiting nodes, we want the exit-
  // transition for all children to have the same duration, delay, etc.
  animate = assign({}, animate, animate.onExit);

  if (exitingNodes) {
    // After the exit transition occurs, trigger the animations for
    // nodes that are neither exiting or entering.
    animate.onEnd = cb;

    // If nodes need to exit, all we want to do is to fade them out.
    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return exitingNodes[key] ?
        Object.assign({}, datum, { opacity: 0 }) :
        datum;
    })
  }

  return { animate, data };
}

function getChildPropsBeforeEnter(animate, data, enteringNodes, cb) {
  if (enteringNodes) {
    // Perform a normal animation here, except - when it finishes - trigger
    // the transition for entering nodes.
    animate = assign({}, animate, { onEnd: cb });

    // We want the entering nodes to be included in the transition target
    // domain.  However, we may not want these nodes to be displayed initially,
    // so perform the `onEnter.before` transformation on each node.
    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return enteringNodes[key] ?
        Object.assign({}, datum, animate.onEnter.before(datum)) :
        datum;
    });    
  }

  return { animate, data };
}

function getChildPropsOnEnter(animate, data, enteringNodes, cb) {
  // Whether or not _this_ child has entering nodes, we want the entering-
  // transition for all children to have the same duration, delay, etc.
  animate = assign({}, animate, animate.onEnter);

  if (enteringNodes) {
    // Old nodes have been transitioned to their new values, and the
    // domain should encompass the nodes that will now enter. So perform
    // the `onEnter.after` transformation on each node.
    data = data.map((datum, idx) => {
      const key = getDatumKey(datum, idx);
      return enteringNodes[key] ?
        assign({}, datum, animate.onEnter.after(datum)) :
        datum;
    });
  }
  return { animate, data };
}

export function childTransitionProps(parentState, parentAnimate, setParentState, childProps, index) {
  const nodesWillExit = parentState && parentState.nodesWillExit;
  const nodesWillEnter = parentState && parentState.nodesWillEnter;
  const nodesShouldEnter = parentState && parentState.nodesShouldEnter;
  const childrenTransitions = parentState && parentState.childrenTransitions;

  const animate = childProps.animate || parentAnimate;
  const data = childProps.data;

  if (nodesWillExit) {
    const exitingNodes = childrenTransitions[index] && childrenTransitions[index].exiting;
    return getChildPropsOnExit(animate, data, exitingNodes, () => setParentState({ nodesWillExit: false }));
  } else if (nodesWillEnter) {
    const enteringNodes = childrenTransitions[index] && childrenTransitions[index].entering;
    return nodesShouldEnter ?
      getChildPropsOnEnter(animate, data, enteringNodes) :
      getChildPropsBeforeEnter(animate, data, enteringNodes, () => setParentState({ nodesShouldEnter: true }));
  } else if (!parentState && animate.onExit) {
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
}

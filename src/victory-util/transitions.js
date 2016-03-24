import assign from "lodash/assign";


function getKeyedData(data) {
  return data.reduce((keyedData, datum, idx) => {
    const key = (datum.key || idx).toString();
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


function getChildPropsOnExit(animate, data, exitingNodes, cb) {
  if (exitingNodes) {
    animate = assign({}, animate || {}, {
      duration: 500,
      onEnd: cb
    });

    // If nodes need to exit, all we want to do is to fade them out.
    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return exitingNodes[key] ?
        Object.assign({}, datum, { opacity: 0 }) :
        datum;
    })
  } else {
    // Although components without transitioning data may not seem like
    // they need to animate here, VictoryAnimation uses old props to
    // determine things like interpolated domain.  So we'll do a no-op
    // animate here.
    animate = { duration: 500 };
  }

  return { animate, data };
}

function getChildPropsBeforeEnter(animate, data, enteringNodes, cb) {
  if (enteringNodes) {
    // We want the nodes-to-enter to be factored into the target domain,
    // but we do not want them to be displayed yet.
      animate = enteringNodes ?
        assign({}, animate || {}, {
          delay: 0,
          onEnd: cb
        }) :
        {};

      data = data.map((datum, idx) => {
        const key = (datum.key || idx).toString();
        return enteringNodes[key] ?
          Object.assign({}, datum, { opacity: 0 }) :
          datum;
      });    
  }

  return { animate, data };
}

function getChildPropsOnEnter(animate, data, enteringNodes, cb) {
  if (enteringNodes) {
    // Old nodes have been transitioned to their new values, and the
    // domain should encompass the nodes that will now enter. So,
    // fade in the new nodes.
    animate = enteringNodes ?
      assign({}, animate, {
        delay: 0,
        duration: 500
      }) :
      // Although components without transitioning data may not seem like
      // they need to animate here, VictoryAnimation uses old props to
      // determine things like interpolated domain.  For that reason,
      // trigger VictoryAnimation use by passing an empty animation object.
      { duration: 500 };

    data = data.map((datum, idx) => {
      const key = (datum.key || idx).toString();
      return enteringNodes[key] ?
        Object.assign({}, datum, { opacity: 1 }) :
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
  }
  if (nodesWillEnter) {
    const enteringNodes = childrenTransitions[index] && childrenTransitions[index].entering;

    if (enteringNodes) {
      return nodesShouldEnter ?
        getChildPropsOnEnter(animate, data, enteringNodes) :
        getChildPropsBeforeEnter(animate, data, enteringNodes, () => setParentState({ nodesShouldEnter: true }));
    }
  }

  return { animate, data };
}

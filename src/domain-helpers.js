import flatten from "lodash/array/flatten";
import isEmpty from "lodash/lang/isEmpty";

import { Collection, Domain } from "victory-util";

module.exports = {
  orientDomain(domain, orientation, axis) {
    // If the other axis is in a reversed orientation, the domain of this axis
    // needs to be reversed
    const otherAxis = axis === "x" ? "y" : "x";
    const defaultOrientation = otherAxis === "x" ? "bottom" : "left";
    const standardOrientation = orientation[otherAxis] === defaultOrientation;
    const flippedAxis = orientation.x === "left" || orientation.x === "right";
    if (flippedAxis) {
      return standardOrientation ?
        domain.concat().reverse() : domain;
    } else {
      return standardOrientation ?
        domain : domain.concat().reverse();
    }
  },

  /*eslint-disable max-params */
  getDomain(props, childComponents, orientations, axis) {
    let domain;
    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
      domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = childComponents.map((component) => {
        return component.type.getDomain(component.props, axis);
      });
      const allDomains = Collection.removeUndefined(flatten(childDomains));
      domain = isEmpty(allDomains) ? [0, 1] : [Math.min(...allDomains), Math.max(...allDomains)];
    }
    const paddedDomain = Domain.padDomain(domain, props, axis);
    return this.orientDomain(paddedDomain, orientations, axis);
  }
  /*eslint-enable max-params */
};

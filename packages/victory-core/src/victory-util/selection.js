/* eslint-disable func-style */
/* eslint-disable no-use-before-define */

import Collection from "./collection";

// Private Functions

function transformTarget(target, matrix, dimension) {
  const { a, d, e, f } = matrix;
  return dimension === "y" ? d * target + f : a * target + e;
}

function getTransformationMatrix(svg) {
  return svg.getScreenCTM().inverse();
}

// Exported Functions

function getParentSVG(evt) {
  if (evt.nativeEvent && evt.nativeEvent.identifier !== undefined) {
    return undefined;
  }
  const getParent = (target) => {
    if (target.nodeName === "svg") {
      return target;
    } else {
      return target.parentNode ? getParent(target.parentNode) : target;
    }
  };
  return getParent(evt.target);
}

function getSVGEventCoordinates(evt, svg) {
  if (evt.nativeEvent && evt.nativeEvent.identifier !== undefined) {
    // react-native override. relies on the RN.View being the _exact_ same size as its child SVG.
    // this should be fine: the svg is the only child of View and the View shirks to its children
    return {
      x: evt.nativeEvent.locationX,
      y: evt.nativeEvent.locationY
    };
  }
  evt = evt.changedTouches && evt.changedTouches.length ? evt.changedTouches[0] : evt;
  svg = svg || getParentSVG(evt);
  const matrix = getTransformationMatrix(svg);
  return {
    x: transformTarget(evt.clientX, matrix, "x"),
    y: transformTarget(evt.clientY, matrix, "y")
  };
}

function getDomainCoordinates(props, domain) {
  const { scale, horizontal } = props;
  domain = domain || { x: scale.x.domain(), y: scale.y.domain() };
  return {
    x: horizontal
      ? [scale.y(domain.y[0]), scale.y(domain.y[1])]
      : [scale.x(domain.x[0]), scale.x(domain.x[1])],
    y: horizontal
      ? [scale.x(domain.x[0]), scale.x(domain.x[1])]
      : [scale.y(domain.y[0]), scale.y(domain.y[1])]
  };
}

// eslint-disable-next-line max-params
function getDataCoordinates(props, scale, x, y) {
  const { polar, horizontal } = props;
  if (!polar) {
    return {
      x: horizontal ? scale.x.invert(y) : scale.x.invert(x),
      y: horizontal ? scale.y.invert(x) : scale.y.invert(y)
    };
  } else {
    const origin = props.origin || { x: 0, y: 0 };
    const baseX = x - origin.x;
    const baseY = y - origin.y;
    const radius = Math.abs(baseX * Math.sqrt(1 + Math.pow(-baseY / baseX, 2)));
    const angle = (-Math.atan2(baseY, baseX) + Math.PI * 2) % (Math.PI * 2);
    return {
      x: scale.x.invert(angle),
      y: scale.y.invert(radius)
    };
  }
}

function getBounds(props) {
  const { x1, x2, y1, y2, scale } = props;
  const point1 = getDataCoordinates(props, scale, x1, y1);
  const point2 = getDataCoordinates(props, scale, x2, y2);
  const makeBound = (a, b) => {
    return [Collection.getMinValue([a, b]), Collection.getMaxValue([a, b])];
  };
  return {
    x: makeBound(point1.x, point2.x),
    y: makeBound(point1.y, point2.y)
  };
}

export default {
  getParentSVG,
  getSVGEventCoordinates,
  getDomainCoordinates,
  getDataCoordinates,
  getBounds
};

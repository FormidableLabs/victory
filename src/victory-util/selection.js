/*global document:false */
/* eslint-disable func-style */
/* eslint-disable no-use-before-define */
import Collection from "./collection";

export default {
  transformTarget(target, matrix, dimension) {
    const { a, d, e, f } = matrix;
    return dimension === "y" ?
      d * target + f : a * target + e;
  },

  getTransformationMatrix(svg) {
    return svg.getScreenCTM().inverse();
  },

  getParentSVG(evt) {
    if (document === undefined) {
      return undefined;
    }
    const getParent = (target) => {
      if (target.nodeName === "svg") {
        return target;
      } else {
        return getParent(target.parentNode);
      }
    };
    return getParent(evt.target);
  },

  getSVGEventCoordinates(evt, svg) {
    if (document === undefined) {
      // react-native override. relies on the RN.View being the _exact_ same size as its child SVG.
      // this should be fine: the svg is the only child of View and the View shirks to its children
      return {
        x: evt.nativeEvent.locationX,
        y: evt.nativeEvent.locationY
      };
    }
    evt = evt.changedTouches && evt.changedTouches.length ? evt.changedTouches[0] : evt;
    svg = svg || this.getParentSVG(evt);
    const matrix = this.getTransformationMatrix(svg);
    return {
      x: this.transformTarget(evt.clientX, matrix, "x"),
      y: this.transformTarget(evt.clientY, matrix, "y")
    };
  },

  getDomainCoordinates(props, domain) {
    const { scale } = props;
    domain = domain || { x: scale.x.domain(), y: scale.y.domain() };
    return {
      x: [scale.x(domain.x[0]), scale.x(domain.x[1])],
      y: [scale.y(domain.y[0]), scale.y(domain.y[1])]
    };
  },

  // eslint-disable-next-line max-params
  getDataCoordinates(props, scale, x, y) {
    const { polar } = props;
    if (!polar) {
      return {
        x: scale.x.invert(x),
        y: scale.y.invert(y)
      };
    } else {
      const origin = props.origin || { x: 0, y: 0 };
      const baseX = x - origin.x;
      const baseY = y - origin.y;
      const radius = Math.abs(baseX * Math.sqrt(1 + Math.pow((-baseY / baseX), 2)));
      const angle = (-Math.atan2(baseY, baseX) + (Math.PI * 2)) % (Math.PI * 2);
      return {
        x: scale.x.invert(angle),
        y: scale.y.invert(radius)
      };
    }
  },

  getBounds(props) {
    const { x1, x2, y1, y2, scale } = props;
    const point1 = this.getDataCoordinates(props, scale, x1, y1);
    const point2 = this.getDataCoordinates(props, scale, x2, y2);
    const makeBound = (a, b) => {
      return [ Collection.getMinValue([a, b]), Collection.getMaxValue([a, b]) ];
    };

    return {
      x: makeBound(point1.x, point2.x),
      y: makeBound(point1.y, point2.y)
    };
  }
};

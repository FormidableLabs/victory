/*global document:false */
import React from "react";
import { isFunction } from "lodash";
import Data from "./data";
import Collection from "./collection";

export default {
  getParentSVG(target) {
    if (target.nodeName === "svg") {
      return target;
    } else {
      return this.getParentSVG(target.parentNode);
    }
  },

  getTransformationMatrix(svg) {
    return svg.getScreenCTM().inverse();
  },

  getSVGEventCoordinates(evt) {
    if (document === undefined) {
      // react-native override. relies on the RN.View being the _exact_ same size as its child SVG.
      // this should be fine: the svg is the only child of View and the View shirks to its children
      return {
        x: evt.nativeEvent.locationX,
        y: evt.nativeEvent.locationY
      };
    }
    evt = evt.changedTouches && evt.changedTouches.length ? evt.changedTouches[0] : evt;
    const svg = this.getParentSVG(evt.target);
    const matrix = this.getTransformationMatrix(svg);
    return {
      x: this.transformTarget(evt.clientX, matrix, "x"),
      y: this.transformTarget(evt.clientY, matrix, "y")
    };
  },

  transformTarget(target, matrix, dimension) {
    const { a, d, e, f } = matrix;
    return dimension === "y" ?
      d * target + f : a * target + e;
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
  },

  getDatasets(props) { // eslint-disable-line max-statements
    if (props.data) {
      return [{ data: props.data }];
    }
    const getData = (childProps) => {
      const data = Data.getData(childProps);
      return Array.isArray(data) && data.length > 0 ? data : undefined;
    };

    // Reverse the child array to maintain correct order when looping over
    // children starting from the end of the array.
    const children = React.Children.toArray(props.children).reverse();
    let childrenLength = children.length;
    const dataArr = [];
    let dataArrLength = 0;
    let childIndex = 0;
    while (childrenLength > 0) {
      const child = children[--childrenLength];
      const childName = child.props.name || childIndex;
      childIndex++;
      if (child.type && child.type.role === "axis") {
        childIndex++;
      } else if (child.type && isFunction(child.type.getData)) {
        dataArr[dataArrLength++] = { childName, data: child.type.getData(child.props) };
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      } else {
        dataArr[dataArrLength++] = { childName, data: getData(child.props) };
      }
    }
    return dataArr;
  },

  filterDatasets(datasets, bounds) {
    const filtered = datasets.reduce((memo, dataset) => {
      const selectedData = this.getSelectedData(dataset.data, bounds);
      memo = selectedData ?
        memo.concat({
          childName: dataset.childName, eventKey: selectedData.eventKey, data: selectedData.data
        }) :
        memo;
      return memo;
    }, []);
    return filtered.length ? filtered : null;
  },

  getSelectedData(dataset, bounds) {
    const { x, y } = bounds;
    const withinBounds = (d) => {
      return d._x >= x[0] && d._x <= x[1] && d._y >= y[0] && d._y <= y[1];
    };

    const selectedData = dataset.reduce((accum, datum, index) => {
      if (withinBounds(datum)) {
        accum.data.push(datum);
        accum.eventKey.push(datum.eventKey === undefined ? index : datum.eventKey);
      }

      return accum;
    }, {
      data: [],
      eventKey: []
    });

    return selectedData.data.length > 0 ? selectedData : null;
  }
};

import { isFunction, assign } from "lodash";
import React from "react";
import { Data, Collection } from "victory-core";

export default {
  getBounds(props) {
    const {x1, x2, y1, y2, scale} = props;
    const scaled = {
      x1: scale.x.invert(x1),
      x2: scale.x.invert(x2),
      y1: scale.y.invert(y1),
      y2: scale.y.invert(y2)
    };

    const makeBound = (a, b) => {
      return [ Collection.getMinValue([a, b]), Collection.getMaxValue([a, b]) ]
    };

    return {
      x: makeBound(scaled.x1, scaled.x2),
      y: makeBound(scaled.y1, scaled.y2)
    };
  },

  getDatasets(props) { // eslint-disable-line max-statements
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
        dataArr[dataArrLength++] = {childName, data: child.type.getData(child.props)};
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      } else {
        dataArr[dataArrLength++] = {childName, data: getData(child.props)};
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
    const {x, y} = bounds;
    const withinBounds = (d) => {
      return d.x >= x[0] && d.x <= x[1] && d.y >= y[0] && d.y <= y[1];
    };
    const eventKey = [];
    const data = [];
    let count = 0;
    for (let index = 0, len = dataset.length; index < len; index++) {
      const datum = dataset[index];
      if (withinBounds(datum)) {
        data[count] = datum;
        eventKey[count] = datum.eventKey === undefined ? index : datum.eventKey;
        count++;
      }
    }
    return count > 0 ? {eventKey, data} : null;
  }
};

import { Selection, Data } from "victory-core";
import { assign, throttle, isFunction, groupBy, keys } from "lodash";
import { voronoi as d3Voronoi } from "d3-voronoi";
import React from "react";

const Helpers = {
  withinDomain(props, point) {
    const {x1, x2, y1, y2} = this.getDomainBox(props);
    const {x, y} = point;
    return x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2);
  },

  getDomainBox(props) {
    const { scale, domain } = props;
    const fullCoordinates = Selection.getDomainCoordinates(scale, domain);
    return {
      x1: Math.min(...fullCoordinates.x),
      x2: Math.max(...fullCoordinates.x),
      y1: Math.min(...fullCoordinates.y),
      y2: Math.max(...fullCoordinates.y)
    };
  },

  // returns an array of data objects with eventKey and childName added
  getDatasets(props) { // eslint-disable-line max-statements
    const addMeta = (data, name) => {
      return data.map((datum, index) => {
        return assign({childName: name, eventKey: index}, datum);
      });
    };

    if (props.data) {
      return addMeta(props.data);
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
    let childIndex = 0;
    while (childrenLength > 0) {
      const child = children[--childrenLength];
      const childName = child.props.name || childIndex;
      childIndex++;
      if (child.type && child.type.role === "axis") {
        childIndex++;
      } else if (child.type && isFunction(child.type.getData)) {
        dataArr.push(...addMeta(child.type.getData(child.props), childName));
      } else if (child.props && child.props.children) {
        const newChildren = React.Children.toArray(child.props.children);
        const newChildrenLength = newChildren.length;
        for (let index = 0; index < newChildrenLength; index++) {
          children[childrenLength++] = newChildren[index];
        }
      } else {
        dataArr.push(...addMeta(getData(child.props), childName));
      }
    }
    return dataArr;
  },

  // returns an array of objects with point and data where point is an x, y coordinate, and data is
  // an array of points belonging to that coordinate
  mergeDatasets(props, datasets) {
    const {scale} = props;
    const points = groupBy(datasets, (datum) => {
      const x = scale.x(datum._x);
      const y = scale.y(datum._y);
      return `${x},${y}`;
    });
    return keys(points).map((key) => {
      const point = key.split(",");
      return {
        x: +point[0],
        y: +point[1],
        data: points[key]
      };
    });
  },

  getVoronoiFunction(props, dataset) {
    const {x1, y1, x2, y2} = this.getDomainBox(props);
    const voronoiFunction = d3Voronoi()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent([[x1, y1], [x2, y2]]);
    return voronoiFunction(dataset);
  },

  // filterDatasets(datasets, bounds) {
  //   const filtered = datasets.reduce((memo, dataset) => {
  //     const selectedData = this.getSelectedData(dataset.data, bounds);
  //     memo = selectedData ?
  //       memo.concat({
  //         childName: dataset.childName, eventKey: selectedData.eventKey, data: selectedData.data
  //       }) :
  //       memo;
  //     return memo;
  //   }, []);
  //   return filtered.length ? filtered : null;
  // },

  // getSelectedData(dataset, bounds) {
  //   const {x, y} = bounds;
  //   const withinBounds = (d) => {
  //     return d._x >= x[0] && d._x <= x[1] && d._y >= y[0] && d._y <= y[1];
  //   };
  //   const eventKey = [];
  //   const data = [];
  //   let count = 0;
  //   for (let index = 0, len = dataset.length; index < len; index++) {
  //     const datum = dataset[index];
  //     if (withinBounds(datum)) {
  //       data[count] = datum;
  //       eventKey[count] = datum.eventKey === undefined ? index : datum.eventKey;
  //       count++;
  //     }
  //   }
  //   return count > 0 ? {eventKey, data} : null;
  // },

  onMouseMove(evt, targetProps) {
    const datasets = this.getDatasets(targetProps);
    const voronoiDataset = this.mergeDatasets(targetProps, datasets);
    const voronoi = this.getVoronoiFunction(targetProps, voronoiDataset);
    const {x, y} = Selection.getSVGEventCoordinates(evt);
    const nearestPoint = voronoi.find(x, y, targetProps.size);
    console.log(nearestPoint);
  }
};

export default {
  onMouseMove: throttle(Helpers.onMouseMove.bind(Helpers), 16, {leading: true})
};

import { Selection, Data, Helpers } from "victory-core";
import { assign, throttle, isFunction, groupBy, keys, isEqual } from "lodash";
import { voronoi as d3Voronoi } from "d3-voronoi";
import React from "react";

const VoronoiHelpers = {
  withinDomain(point, domainBox) {
    const {x1, x2, y1, y2} = domainBox;
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

  getDatasets(props) {
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

    const iteratee = (child, childName, parent) => {
      if (child.type && child.type.role === "axis") {
        return null;
      } else if (child.type && isFunction(child.type.getData)) {
        child = parent ? React.cloneElement(child, parent.props) : child;
        const childData = child.props && child.type.getData(child.props);
        return childData ? addMeta(childData, childName) : null;
      } else {
        const childData = getData(child.props);
        return childData ? addMeta(childData, childName) : null;
      }
    };
    return Helpers.reduceChildren(React.Children.toArray(props.children), iteratee);
  },

  // returns an array of objects with point and data where point is an x, y coordinate, and data is
  // an array of points belonging to that coordinate
  mergeDatasets(props, datasets) {
    const {scale} = props;
    const points = groupBy(datasets, (datum) => {
      const x = scale.x(datum ._x1 !== undefined ? datum ._x1 : datum ._x);
      const y = scale.y(datum ._y1 !== undefined ? datum ._y1 : datum ._y);
      return `${x},${y}`;
    });
    return keys(points).map((key) => {
      const point = key.split(",");
      return {
        x: +point[0],
        y: +point[1],
        points: points[key]
      };
    });
  },

  getVoronoiFunction(targetProps) {
    const {width, height, voronoiPadding} = targetProps;
    const padding = voronoiPadding || 0;
    return d3Voronoi()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent([[padding, padding], [width - padding, height - padding]]);
  },

  getActiveMutations(point) {
    const {childName, eventKey} = point;
    return ["data", "labels"].map((target) => {
      return {
        childName, eventKey, target, mutation: () => ({active: true })
      };
    });
  },

  getInactiveMutations(point) {
    const {childName, eventKey} = point;
    return ["data", "labels"].map((target) => {
      return {
        childName, eventKey, target, mutation: () => null
      };
    });
  },

  onMouseLeave(evt, targetProps) {
    const activePoints = targetProps.activePoints || [];
    const parentMutations = [{
      target: "parent",
      mutation: () => {
        return { activePoints: [] };
      }
    }];
    return activePoints.reduce((memo, point) => {
      memo = memo.concat(this.getInactiveMutations(point));
      return memo;
    }, [parentMutations]);
  },

  onMouseMove(evt, targetProps) {
    const domainBox = targetProps.domainBox || this.getDomainBox(targetProps);
    const activePoints = targetProps.activePoints || [];
    const {x, y} = Selection.getSVGEventCoordinates(evt);
    // if (!this.withinDomain({x, y}, domainBox)) {
    //   const parentMutations = [{
    //     target: "parent",
    //     eventKey: "parent",
    //     mutation: () => {
    //       return { domainBox };
    //     }
    //   }];
    //   return activePoints.reduce((memo, point) => {
    //     memo = memo.concat(this.getInactiveMutations(point));
    //     return memo;
    //   }, parentMutations);
    // }
    const datasets = this.getDatasets(targetProps);
    const voronoiDataset = this.mergeDatasets(targetProps, datasets);
    const voronoiFunction = this.getVoronoiFunction(targetProps);
    const voronoi = voronoiFunction(voronoiDataset);
    const polygons = voronoiFunction.polygons(voronoiDataset);
    const nearestVoronoi = voronoi.find(x, y, targetProps.size);
    const points = nearestVoronoi ? nearestVoronoi.data.points : [];
    const parentMutations = [{
      target: "parent",
      eventKey: "parent",
      mutation: () => {
        return { activePoints: points, domainBox, polygons };
      }
    }];
    if (isEqual(points, activePoints)) {
      return parentMutations;
    } else {
      const activeMutations = points.map((point) => this.getActiveMutations(point));
      const inactiveMutations = activePoints.map((point) => this.getInactiveMutations(point));

      return parentMutations.concat(...inactiveMutations, ...activeMutations);
    }
  }
};

export default {
  onMouseLeave: VoronoiHelpers.onMouseLeave.bind(VoronoiHelpers),
  onMouseMove: throttle(VoronoiHelpers.onMouseMove.bind(VoronoiHelpers), 16, {leading: true})
};

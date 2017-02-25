import { Selection, Data, Helpers } from "victory-core";
import { assign, throttle, isFunction, groupBy, keys, isEqual } from "lodash";
import { voronoi as d3Voronoi } from "d3-voronoi";
import React from "react";

const VoronoiHelpers = {
  withinBounds(props, point) {
    const {width, height, voronoiPadding} = props;
    const padding = voronoiPadding || 0;
    const {x, y} = point;
    return x >= padding && x <= width - padding && y >= padding && y <= height - padding;
  },

  getDatasets(props) {
    const addMeta = (data, name, child) => {
      const continuous = child && child.type && child.type.continuous;
      const style = child ? child.props && child.props.style : props.style;
      return data.map((datum, index) => {
        const x = datum._x1 !== undefined ? datum._x1 : datum._x;
        const y = datum._y1 !== undefined ? datum._y1 : datum._y;
        return assign({
          _voronoiX: props.dimension === "y" ? 0 : x,
          _voronoiY: props.dimension === "x" ? 0 : y,
          childName: name, eventKey: index, continuous, style
        }, datum);
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
        return childData ? addMeta(childData, childName, child) : null;
      } else {
        const childData = getData(child.props);
        return childData ? addMeta(childData, childName, child) : null;
      }
    };
    return Helpers.reduceChildren(React.Children.toArray(props.children), iteratee);
  },

  // returns an array of objects with point and data where point is an x, y coordinate, and data is
  // an array of points belonging to that coordinate
  mergeDatasets(props, datasets) {
    const {scale} = props;
    const points = groupBy(datasets, (datum) => {
      const x = scale.x(datum ._voronoiX);
      const y = scale.y(datum ._voronoiY);
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

  getVoronoi(props) {
    const {width, height, voronoiPadding} = props;
    const padding = voronoiPadding || 0;
    const voronoiFunction = d3Voronoi()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent([[padding, padding], [width - padding, height - padding]]);
    const datasets = this.getDatasets(props);
    return voronoiFunction(this.mergeDatasets(props, datasets));
  },

  getActiveMutations(props, point) {
    const {childName, continuous} = point;
    const targets = props.labels ? ["data"] : ["data", "labels"];
    return targets.map((target) => {
      const eventKey = continuous === true && target === "data" ? "all" : point.eventKey;
      return {
        childName, eventKey, target, mutation: () => ({active: true })
      };
    });
  },

  getInactiveMutations(props, point) {
    const {childName, continuous} = point;
    const targets = props.labels ? ["data"] : ["data", "labels"];
    return targets.map((target) => {
      const eventKey = continuous && target === "data" ? "all" : point.eventKey;
      return {
        childName, eventKey, target, mutation: () => null
      };
    });
  },

  getParentMutation(activePoints, mousePosition) {
    return [{
      target: "parent",
      eventKey: "parent",
      mutation: () => ({ activePoints, mousePosition })
    }];
  },

  onMouseLeave(evt, targetProps) {
    const activePoints = targetProps.activePoints || [];
    const inactiveMutations = activePoints.length ?
      activePoints.map((point) => this.getInactiveMutations(targetProps, point)) : [];
    return this.getParentMutation([]).concat(...inactiveMutations);
  },

  onMouseMove(evt, targetProps) {
    const activePoints = targetProps.activePoints || [];
    const mousePosition = Selection.getSVGEventCoordinates(evt);
    if (!this.withinBounds(targetProps, mousePosition)) {
      const inactiveMutations = activePoints.length ?
        activePoints.map((point) => this.getInactiveMutations(targetProps, point)) : [];
      return this.getParentMutation([], mousePosition).concat(...inactiveMutations);
    }
    const voronoi = this.getVoronoi(targetProps);
    const size = targetProps.dimension ? undefined : targetProps.radius;
    const nearestVoronoi = voronoi.find(mousePosition.x, mousePosition.y, size);
    const points = nearestVoronoi ? nearestVoronoi.data.points : [];
    const parentMutations = this.getParentMutation(points, mousePosition);
    if (activePoints.length && isEqual(points, activePoints)) {
      return parentMutations;
    } else {
      const activeMutations = points.length ?
        points.map((point) => this.getActiveMutations(targetProps, point)) : [];
      const inactiveMutations = activePoints.length ?
        activePoints.map((point) => this.getInactiveMutations(targetProps, point)) : [];
      return parentMutations.concat(...inactiveMutations, ...activeMutations);
    }
  }
};

export default {
  onMouseLeave: VoronoiHelpers.onMouseLeave.bind(VoronoiHelpers),
  onMouseMove: throttle(VoronoiHelpers.onMouseMove.bind(VoronoiHelpers), 16, {leading: true})
};

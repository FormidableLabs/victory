import { Selection, Data, Helpers } from "victory-core";
import { assign, throttle, isFunction, groupBy, keys, isEqual } from "lodash";
import { voronoi as d3Voronoi } from "d3-voronoi";
import React from "react";
import { attachId } from "../../helpers/event-handlers";

const VoronoiHelpers = {
  withinBounds(props, point) {
    const { width, height, voronoiPadding, polar, origin, scale } = props;
    const padding = voronoiPadding || 0;
    const { x, y } = point;
    if (polar) {
      const distanceSquared = Math.pow(x - origin.x, 2) + Math.pow(y - origin.y, 2);
      const radius = Math.max(...scale.y.range());
      return distanceSquared < Math.pow(radius, 2);
    } else {
      return x >= padding && x <= width - padding && y >= padding && y <= height - padding;
    }
  },

  getDatasets(props) {
    const addMeta = (data, name, child) => {
      const continuous = child && child.type && child.type.continuous;
      const style = child ? child.props && child.props.style : props.style;
      return data.map((datum, index) => {
        const { x, y } = Helpers.getPoint(datum);
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
        const childData = child.props
          && child.type.getData({ ...child.props, domain: props.domain });
        return childData ? addMeta(childData, childName, child) : null;
      } else {
        const childData = getData({ ...child.props, domain: props.domain });
        return childData ? addMeta(childData, childName, child) : null;
      }
    };
    return Helpers.reduceChildren(React.Children.toArray(props.children), iteratee);
  },

  // returns an array of objects with point and data where point is an x, y coordinate, and data is
  // an array of points belonging to that coordinate
  mergeDatasets(props, datasets) {
    const points = groupBy(datasets, (datum) => {
      const { x, y } = Helpers.scalePoint(props, datum);
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

  getVoronoi(props, mousePosition) {
    const { width, height, voronoiPadding } = props;
    const padding = voronoiPadding || 0;
    const voronoiFunction = d3Voronoi()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent([[padding, padding], [width - padding, height - padding]]);
    const datasets = this.getDatasets(props);
    const voronoi = voronoiFunction(this.mergeDatasets(props, datasets));
    const size = props.dimension ? undefined : props.radius;
    return voronoi.find(mousePosition.x, mousePosition.y, size);
  },

  getActiveMutations(props, point) {
    const { childName, continuous } = point;
    const targets = props.labels ? ["data"] : ["data", "labels"];
    return targets.map((target) => {
      const eventKey = continuous === true && target === "data" ? "all" : point.eventKey;
      return {
        childName, eventKey, target, mutation: () => ({ active: true })
      };
    });
  },

  getInactiveMutations(props, point) {
    const { childName, continuous } = point;
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

  onActivated(props, points) {
    if (isFunction(props.onActivated)) {
      props.onActivated(points, props);
    }
  },

  onDeactivated(props, points) {
    if (isFunction(props.onDeactivated)) {
      props.onDeactivated(points, props);
    }
  },

  onMouseLeave(evt, targetProps) {
    const activePoints = targetProps.activePoints || [];
    this.onDeactivated(targetProps, activePoints);
    const inactiveMutations = activePoints.length ?
      activePoints.map((point) => this.getInactiveMutations(targetProps, point)) : [];
    return this.getParentMutation([]).concat(...inactiveMutations);
  },

  onMouseMove(evt, targetProps) { // eslint-disable-line max-statements
    const activePoints = targetProps.activePoints || [];
    const mousePosition = Selection.getSVGEventCoordinates(evt);
    if (!this.withinBounds(targetProps, mousePosition)) {
      this.onDeactivated(targetProps, activePoints);
      const inactiveMutations = activePoints.length ?
        activePoints.map((point) => this.getInactiveMutations(targetProps, point)) : [];
      return this.getParentMutation([], mousePosition).concat(...inactiveMutations);
    }
    const nearestVoronoi = this.getVoronoi(targetProps, mousePosition);
    const points = nearestVoronoi ? nearestVoronoi.data.points : [];
    const parentMutations = this.getParentMutation(points, mousePosition);
    if (activePoints.length && isEqual(points, activePoints)) {
      return parentMutations;
    } else {
      this.onActivated(targetProps, points);
      this.onDeactivated(targetProps, activePoints);
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
  onMouseMove: throttle(
    attachId(VoronoiHelpers.onMouseMove.bind(VoronoiHelpers)),
    32, // eslint-disable-line no-magic-numbers
    { leading: true, trailing: false })
};

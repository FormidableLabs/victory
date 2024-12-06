import { Collection, Selection, Data, Helpers } from "victory-core";
import isEmpty from "lodash/isEmpty";
import isRegExp from "lodash/isRegExp";
import throttle from "lodash/throttle";
import isEqual from "react-fast-compare";
import Delaunay from "delaunay-find/lib/index.js";
import React from "react";

const ON_MOUSE_MOVE_THROTTLE_MS = 32;

class VoronoiHelpersClass {
  withinBounds(props, point) {
    const { width, height, polar, origin, scale } = props;
    const padding = Helpers.getPadding(props.voronoiPadding);
    const { x, y } = point;
    if (polar) {
      const distanceSquared =
        Math.pow(x - origin.x, 2) + Math.pow(y - origin.y, 2);
      const radius = Math.max(...scale.y.range());
      return distanceSquared < Math.pow(radius, 2);
    }
    return (
      x >= padding.left &&
      x <= width - padding.right &&
      y >= padding.top &&
      y <= height - padding.bottom
    );
  }

  getDatasets(props) {
    const minDomain = {
      x: Collection.getMinValue(props.domain.x),
      y: Collection.getMinValue(props.domain.y),
    };
    const children = React.Children.toArray(props.children);
    const addMeta = (data, name?, child?) => {
      const continuous = child && child.type && child.type.continuous;
      const style = child ? child.props && child.props.style : props.style;
      return data.map((datum, index) => {
        const { x, y, y0, x0 } = Helpers.getPoint(datum);
        const voronoiX = (Number(x) + Number(x0)) / 2;
        const voronoiY = (Number(y) + Number(y0)) / 2;

        return Object.assign(
          {
            _voronoiX: props.voronoiDimension === "y" ? minDomain.x : voronoiX,
            _voronoiY: props.voronoiDimension === "x" ? minDomain.y : voronoiY,
            eventKey: index,
            childName: name,
            continuous,
            style,
          },
          datum,
        );
      });
    };

    if (props.data) {
      return addMeta(props.data);
    }

    const getData = (childProps) => {
      const data = Data.getData(childProps);
      return Array.isArray(data) && data.length > 0 ? data : undefined;
    };

    const iteratee = (child, childName) => {
      const childProps = child.props || {};
      const name = childProps.name || childName;
      const blacklist = props.voronoiBlacklist || [];
      const blacklistStr = blacklist.filter(
        (value) => !!value && typeof value.valueOf() === "string",
      );
      const blacklistRegExp = blacklist.filter(isRegExp);
      const isRegExpMatch = blacklistRegExp.some((regExp) => regExp.test(name));
      if (
        !Data.isDataComponent(child) ||
        blacklistStr.includes(name) ||
        isRegExpMatch
      ) {
        return null;
      }
      const getChildData =
        child.type && Helpers.isFunction(child.type.getData)
          ? child.type.getData
          : getData;
      const childData = getChildData(child.props);
      return childData ? addMeta(childData, name, child) : null;
    };

    return Helpers.reduceChildren(children, iteratee, props);
  }

  findPoints(datasets, point) {
    return datasets.filter((d) => {
      return point._voronoiX === d._voronoiX && point._voronoiY === d._voronoiY;
    });
  }

  withinRadius(point, mousePosition, radius) {
    if (!point) {
      return false;
    }
    if (!radius) {
      return true;
    }
    const { x, y } = mousePosition;
    const distanceSquared =
      Math.pow(x - point[0], 2) + Math.pow(y - point[1], 2);
    return distanceSquared < Math.pow(radius, 2);
  }

  getVoronoiPoints(props, mousePosition) {
    const datasets = this.getDatasets(props);
    const scaledData = datasets.map((d) => {
      const { x, y } = Helpers.scalePoint(props, d);
      return [x, y];
    });
    const delaunay = Delaunay.from(scaledData);
    const index = delaunay.find(mousePosition.x, mousePosition.y);
    const withinRadius = this.withinRadius(
      scaledData[index],
      mousePosition,
      props.radius,
    );
    const points = withinRadius
      ? this.findPoints(datasets, datasets[index])
      : [];
    return { points, index };
  }

  getActiveMutations(props, point) {
    const { childName, continuous } = point;
    const { activateData, activateLabels, labels } = props;
    if (!activateData && !activateLabels) {
      return [];
    }
    const defaultTarget = activateData ? ["data"] : [];
    const targets =
      labels && !activateLabels
        ? defaultTarget
        : defaultTarget.concat("labels");
    if (isEmpty(targets)) {
      return [];
    }
    return targets.map((target) => {
      const eventKey =
        continuous === true && target === "data" ? "all" : point.eventKey;
      return {
        childName,
        eventKey,
        target,
        mutation: () => ({ active: true }),
      };
    });
  }

  getInactiveMutations(props, point) {
    const { childName, continuous } = point;
    const { activateData, activateLabels, labels } = props;
    if (!activateData && !activateLabels) {
      return [];
    }
    const defaultTarget = activateData ? ["data"] : [];
    const targets =
      labels && !activateLabels
        ? defaultTarget
        : defaultTarget.concat("labels");
    if (isEmpty(targets)) {
      return [];
    }
    return targets.map((target) => {
      const eventKey = continuous && target === "data" ? "all" : point.eventKey;
      return {
        childName,
        eventKey,
        target,
        mutation: () => null,
      };
    });
  }

  // eslint-disable-next-line max-params
  getParentMutation(activePoints, mousePosition?, parentSVG?, vIndex?) {
    return [
      {
        target: "parent",
        eventKey: "parent",
        mutation: () => ({ activePoints, mousePosition, parentSVG, vIndex }),
      },
    ];
  }

  onActivated(props, points) {
    if (Helpers.isFunction(props.onActivated)) {
      props.onActivated(points, props);
    }
  }

  onDeactivated(props, points) {
    if (Helpers.isFunction(props.onDeactivated)) {
      props.onDeactivated(points, props);
    }
  }

  onMouseLeave = (evt, targetProps) => {
    this.onMouseMove.cancel();
    const activePoints = targetProps.activePoints || [];
    this.onDeactivated(targetProps, activePoints);
    const inactiveMutations = activePoints.length
      ? activePoints.map((point) =>
          this.getInactiveMutations(targetProps, point),
        )
      : [];
    return this.getParentMutation([]).concat(...inactiveMutations);
  };

  private handleMouseMove = (evt, targetProps) => {
    const activePoints = targetProps.activePoints || [];
    const parentSVG = targetProps.parentSVG || Selection.getParentSVG(evt);
    const mousePosition = Selection.getSVGEventCoordinates(evt, parentSVG);
    if (!this.withinBounds(targetProps, mousePosition)) {
      this.onDeactivated(targetProps, activePoints);
      const inactiveMutations = activePoints.length
        ? activePoints.map((point) =>
            this.getInactiveMutations(targetProps, point),
          )
        : [];
      return this.getParentMutation([], mousePosition, parentSVG).concat(
        ...inactiveMutations,
      );
    }
    const { points = [], index } = this.getVoronoiPoints(
      targetProps,
      mousePosition,
    );
    const parentMutations = this.getParentMutation(
      points,
      mousePosition,
      parentSVG,
      index,
    );
    if (activePoints.length && isEqual(points, activePoints)) {
      return parentMutations;
    }
    this.onActivated(targetProps, points);
    this.onDeactivated(targetProps, activePoints);
    const activeMutations = points.length
      ? points.map((point) => this.getActiveMutations(targetProps, point))
      : [];
    const inactiveMutations = activePoints.length
      ? activePoints.map((point) =>
          this.getInactiveMutations(targetProps, point),
        )
      : [];
    return parentMutations.concat(...inactiveMutations, ...activeMutations);
  };

  onMouseMove = throttle(this.handleMouseMove, ON_MOUSE_MOVE_THROTTLE_MS, {
    leading: true,
    trailing: false,
  });
}

export const VoronoiHelpers = new VoronoiHelpersClass();

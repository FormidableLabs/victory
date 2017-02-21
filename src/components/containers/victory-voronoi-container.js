import React from "react";
import { VictoryContainer, VictoryTooltip, Helpers } from "victory-core";
import VoronoiHelpers from "./voronoi-helpers";
import { omit } from "lodash";


export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    standalone: React.PropTypes.bool,
    radius: React.PropTypes.number,
    voronoiPadding: React.PropTypes.number,
    labelComponent: React.PropTypes.element,
    labels: React.PropTypes.func
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    standalone: true,
    labelComponent: <VictoryTooltip/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseLeave: (evt, targetProps) => {
        VoronoiHelpers.onMouseMove.cancel();
        return VoronoiHelpers.onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        return VoronoiHelpers.onMouseMove(evt, targetProps);
      }
    }
  }, {
    target: "data",
    eventHandlers: {
      onMouseOver: () => null,
      onMouseOut: () => null,
      onMouseMove: () => null
    }
  }];

  getLabelPosition(point, scale) {
    return {
      x: scale.x(point._x1 !== undefined ? point._x1 : point._x),
      y: scale.y(point._y1 !== undefined ? point._y1 : point._y)
    };
  }

  getLabelStyle(points) {
    return points.map((point) => {
      const baseStyle = point.style && point.style.labels;
      return Helpers.evaluateStyle(baseStyle, point, true);
    });
  }

  getLabelProps(props, points) {
    const {labels, scale} = props;
    const labelPosition = this.getLabelPosition(points[0], scale);
    const style = this.getLabelStyle(points);
    return {
      active: true,
      style,
      text: points.map((point) => Helpers.evaluateProp(labels, point, true)),
      datum: omit(points[0], ["childName", "style", "continuous"]),
      scale,
      ...labelPosition
    };
  }

  getTooltip(props) {
    const {labels, activePoints, labelComponent} = props;
    if (!labels) {
      return null;
    }
    if (Array.isArray(activePoints) && activePoints.length) {
      return React.cloneElement(labelComponent, this.getLabelProps(props, activePoints));
    }
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = React.Children.toArray(props.children);
    return [...children, this.getTooltip(props)].map((component, i) => {
      return component ? React.cloneElement(component, {key: i}) : null;
    });
  }
}

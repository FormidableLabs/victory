import React from "react";
import { VictoryContainer, VictoryTooltip, Helpers, TextSize } from "victory-core";
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
    labels: React.PropTypes.func,
    dimension: React.PropTypes.oneOf(["x", "y"])
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    standalone: true,
    labelComponent: <VictoryTooltip/>,
    voronoiPadding: 5
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

  getLabelPadding(style) {
    if (!style) {
      return 0;
    }
    const paddings = Array.isArray(style) ? style.map((s) => s.padding) : [style.padding];
    return Math.max(...paddings, 0);
  }

  getFlyoutSize(labelComponent, text, style) {
    const padding = this.getLabelPadding(style);
    const textSize = TextSize.approximateTextSize(text, style);
    return {
      x: labelComponent.width || textSize.width + padding,
      y: labelComponent.height || textSize.height + padding
    };
  }

  getFlyoutExtent(props, point, flyoutSize) {
    const {labelComponent, mousePosition} = props;
    const dataX = point._x1 !== undefined ? point._x1 : point._x;
    const dataY = point._y1 !== undefined ? point._y1 : point._y;
    const {x, y} = mousePosition;
    const orientation = labelComponent.props && labelComponent.props.orientation;
    const horizontal = labelComponent.props && labelComponent.props.horizontal;
    const signs = { left: 1, right: -1, top: 1, bottom: -1 };
    const pointSigns = { x: dataX < 0 ? -1 : 1, y: dataY < 0 ? -1 : 1};
    const multiplier = {
      x: horizontal ? signs[orientation] || pointSigns.x : 0,
      y: horizontal ? 0 : signs[orientation] || pointSigns.y
    };
    const extent = {
      x: horizontal ?
        [x, x + multiplier.x * flyoutSize.x] : [x - (flyoutSize.x / 2), x + (flyoutSize.x / 2)],
      y: horizontal ?
        [y - (flyoutSize.y / 2), y + (flyoutSize.y / 2)] : [y, y + multiplier.y * flyoutSize.y]
    };
    return {
      x: [Math.min(...extent.x), Math.max(...extent.x)],
      y: [Math.min(...extent.y), Math.max(...extent.y)]
    };
  }

  getLabelPosition(props, point, text, style) { // eslint-disable-line max-params
    const { mousePosition, dimension, scale, labelComponent } = props;
    const dataX = point._x1 !== undefined ? point._x1 : point._x;
    const dataY = point._y1 !== undefined ? point._y1 : point._y;
    const basePosition = {
      x: scale.x(dataX),
      y: scale.y(dataY)
    };
    if (!dimension) {
      return basePosition;
    }
    const x = dimension === "y" ? mousePosition.x : basePosition.x;
    const y = dimension === "x" ? mousePosition.y : basePosition.y;
    const flyoutSize = this.getFlyoutSize(labelComponent, text, style);
    const range = { x: scale.x.range, y: scale.y.range };
    const extent = {
      x: [range.x[0] + flyoutSize.x, range.x[1] - flyoutSize.x],
      y: [range.y[0] + flyoutSize.y, range.y[1] - flyoutSize.y],
    };
    const flyoutExtent = this.getFlyoutExtent(props, point, flyoutSize);
    const adjustments = {
      x: [
        flyoutExtent.x[0] < extent.x[0] ? extent.x[0] - flyoutExtent.x[0] : 0,
        flyoutExtent.x[1] > extent.x[1] ? flyoutExtent.x[1] - extent.x[1] : 0
      ],
      y: [
        flyoutExtent.y[0] < extent.y[0] ? extent.y[0] - flyoutExtent.y[0] : 0,
        flyoutExtent.y[1] > extent.y[1] ? flyoutExtent.y[1] - extent.y[1] : 0
      ]
    };
    return {
      x: x + adjustments.x[0] - adjustments.x[1], y: y + adjustments.y[0] - adjustments.y[1]
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
    const text = points.map((point) => Helpers.evaluateProp(labels, point, true));
    const style = this.getLabelStyle(points);
    const labelPosition = this.getLabelPosition(props, points[0], text, style);
    console.log(labelPosition, text)
    return {
      active: true,
      renderInPortal: false,
      style,
      text,
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
    } else {
      return null;
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

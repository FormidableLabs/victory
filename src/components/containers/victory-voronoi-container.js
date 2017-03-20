import React from "react";
import { VictoryContainer, VictoryTooltip, Helpers, TextSize } from "victory-core";
import VoronoiHelpers from "./voronoi-helpers";
import { omit, defaults } from "lodash";


export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static role = "container";
  static propTypes = {
    ...VictoryContainer.propTypes,
    onActivated: React.PropTypes.func,
    onDeactivated: React.PropTypes.func,
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

  static role = "voronoi";

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseLeave: (evt, targetProps) => {
        VoronoiHelpers.onMouseMove.cancel();
        return VoronoiHelpers.onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        const mutations = VoronoiHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mutationId) { // eslint-disable-line
          this.mutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }
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

  getFlyoutExtent(position, flyoutSize) {
    const {x, y} = position;
    const width = flyoutSize.x / 2;
    const height = flyoutSize.y;
    const extent = {x: [x - width, x + width], y: [y - height, y]};
    return {
      x: [Math.min(...extent.x), Math.max(...extent.x)],
      y: [Math.min(...extent.y), Math.max(...extent.y)]
    };
  }

  getLabelPosition(props, points, text, style) { // eslint-disable-line max-params
    const { mousePosition, dimension, scale, labelComponent, voronoiPadding } = props;
    const dataX = points[0]._x1 !== undefined ? points[0]._x1 : points[0]._x;
    const dataY = points[0]._y1 !== undefined ? points[0]._y1 : points[0]._y;
    const basePosition = {
      x: scale.x(dataX),
      y: scale.y(dataY)
    };
    if (!dimension || points.length < 2) {
      return basePosition;
    }

    const x = dimension === "y" ? mousePosition.x : basePosition.x;
    const y = dimension === "x" ? mousePosition.y : basePosition.y;
    const flyoutSize = this.getFlyoutSize(labelComponent, text, style);
    const range = { x: scale.x.range(), y: scale.y.range() };
    const extent = {
      x: [Math.min(...range.x) + voronoiPadding, Math.max(...range.x) - voronoiPadding],
      y: [Math.min(...range.y) + voronoiPadding, Math.max(...range.y) - voronoiPadding]
    };
    const flyoutExtent = this.getFlyoutExtent({x, y}, flyoutSize);
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
      x: Math.round(x + adjustments.x[0] - adjustments.x[1]),
      y: Math.round(y + adjustments.y[0] - adjustments.y[1])
    };
  }

  getStyle(props, points, type) {
    const { labelComponent, theme } = props;
    const themeStyles = theme && theme.voronoi && theme.voronoi.style ? theme.voronoi.style : {};
    const defaultStyles = defaults({}, labelComponent.props.style, themeStyles[type]);
    return points.map((point) => {
      const style = point.style && point.style[type] || {};
      return Helpers.evaluateStyle(defaults({}, style, defaultStyles), point, true);
    });
  }

  getDefaultLabelProps(props, points) {
    const {dimension} = props;
    const multiPoint = dimension && points.length > 1;
    return {
      orientation: multiPoint ? "top" : undefined,
      pointerLength: multiPoint ? 0 : undefined
    };
  }

  getLabelProps(props, points) {
    const {labels, scale, labelComponent} = props;
    const text = points.map((point) => Helpers.evaluateProp(labels, point, true));
    const style = this.getStyle(props, points, "labels");
    const labelPosition = this.getLabelPosition(props, points, text, style);
    return defaults(
      {
        active: true,
        renderInPortal: false,
        style,
        flyoutStyle: this.getStyle(props, points, "flyout")[0],
        text,
        datum: omit(points[0], ["childName", "style", "continuous"]),
        scale,
        ...labelPosition
      },
      labelComponent.props,
      this.getDefaultLabelProps(props, points)
    );
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
